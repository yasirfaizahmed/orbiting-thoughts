from pathlib import Path as pp

# here
__here = pp(__file__)

# main dir
BACK_END = __here.parent.parent

# other dirs
PATTERNS = pp(BACK_END, "patterns")
UTILS = pp(BACK_END, "utils")
LOGS = pp(BACK_END, "_LOGs")
RESOURCES = pp(BACK_END, "resources")
