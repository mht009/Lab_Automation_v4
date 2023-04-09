import os


def getFileNames(path):
    # files in the the directory
    dir_list = os.listdir(path)

    path2x = "/res/Room1/"
    listFiles = list(map(lambda x: path2x + x, dir_list))

    return listFiles


pathR1 = "res\Room1"

# path to pac runner participants
pathR2 = "res\Room2"

# path to retromania participants
pathR3 = "res\Room3"

print(getFileNames(pathR1))
# print(getFileNames(pathR2))
# print(getFileNames(pathR3))
