import wifi


class WifiManager:

    def __init__(self, card='wlan0'):
        self.card = card

    def search(self):
        wifilist = []

        cells = wifi.Cell.all(self.card)

        for cell in cells:
            wifilist.append(cell)

        return wifilist


    def findFromSearchList(self, ssid):
        wifilist = self.search()

        for cell in wifilist:
            if cell.ssid == ssid:
                return cell


    def findFromSavedList(self, ssid):
        cell = wifi.Scheme.find(self.card, ssid)

        if cell:
            return cell


    def connect(self, ssid, password=None):
        cell = self.findFromSearchList(ssid)

        if not cell:
            return

        savedcell = self.findFromSavedList(cell.ssid)

        # Cell already known
        if savedcell:
            savedcell.activate()
            return cell

        # Unknown cell, registering
        scheme = self.add(cell, password)

        try:
            scheme.activate()
        except wifi.exceptions.ConnectionError:
            self.delete(ssid)
            return

        return cell


    def add(self, cell, password=None):
        scheme = wifi.Scheme.for_cell(self.card, cell.ssid, cell, password)
        scheme.save()

        return scheme


    def delete(self, ssid):
        cell = self.findFromSavedList(ssid)

        if not cell:
            return

        cell.delete()
