import wifi


def search():
    wifilist = []

    cells = wifi.Cell.all('wlan0')

    for cell in cells:
        wifilist.append(cell)

    return wifilist


def findFromSearchList(ssid):
    wifilist = search()

    for cell in wifilist:
        if cell.ssid == ssid:
            return cell

    return False


def findFromSavedList(ssid):
    cell = wifi.Scheme.find('wlan0', ssid)

    if cell:
        return cell

    return False


def connect(ssid, password=None):
    cell = findFromSearchList(ssid)

    if not cell:
        return False

    savedcell = findFromSavedList(cell.ssid)

    # Already Saved from Setting
    if savedcell:
        savedcell.activate()
        return cell

    # First time to conenct
    if cell.encrypted:
        if not password:
            return False

        scheme = add(cell, password)

        try:
            scheme.activate()
        # Wrong Password
        except wifi.exceptions.ConnectionError:
            delete(ssid)
            return False

        return cell

    else:
        scheme = add(cell)

        try:
            scheme.activate()
        except wifi.exceptions.ConnectionError:
            delete(ssid)
            return False

        return cell



def add(cell, password=None):
    scheme = wifi.Scheme.for_cell('wlan0', cell.ssid, cell, password)
    scheme.save()

    return scheme


def delete(ssid):
    cell = findFromSavedList(ssid)

    if not cell:
        return False

    cell.delete()

    return True

