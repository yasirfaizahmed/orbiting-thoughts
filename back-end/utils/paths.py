from pathlib import Path as pp

# here
__here = pp(__file__)

# main dir
BACK_END = __here.parent.parent
BACKE_END_PARENT = BACK_END.parent

# other dirs
LOGS = pp(BACKE_END_PARENT, "_LOGs")
RESOURCES = pp(BACKE_END_PARENT, "resources")
ARTICLE_IMAGES = pp(RESOURCES, "article_images")
PROFILE_PICTURES = pp(RESOURCES, "profile_pictures")
PATTERNS = pp(BACK_END, "patterns")
UTILS = pp(BACK_END, "utils")
SRC = pp(BACKE_END_PARENT, "src")
ASSETS = pp(BACK_END, "assets")
ASSETS_IMAGES = pp(ASSETS, "img")


if __name__ == "__main__":
    print(BACK_END)
