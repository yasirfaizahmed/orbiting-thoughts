from pathlib import Path as pp

# here
__here = pp(__file__)

# main dir
BACK_END = __here.parent.parent
BACKE_END_PARENT = BACK_END.parent

# other dirs
LOGS = pp(BACKE_END_PARENT, "_LOGs")
RESOURCES = pp(BACKE_END_PARENT, "resources")
R_IMAGES = pp(RESOURCES, "images")
PATTERNS = pp(BACK_END, "patterns")
UTILS = pp(BACK_END, "utils")
