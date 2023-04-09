import cv2
import os

# function to cut image into 9 equal parts


def cut9(src):
    img = cv2.imread(str(src))

    # cv2.imread() -> takes an image as an input
    h, w, channels = img.shape

    oneThirdWidth = w//3
    twoThirdWidth = (w*2)//3

    # height = h//2
    oneThirdHeight = h//3
    twoThirdHeight = (h*2)//3

    # this will be the first column
    # left_part = img[:, :half]
    top_left = img[:oneThirdHeight, :oneThirdWidth]
    middle_left = img[oneThirdHeight:twoThirdHeight, :oneThirdWidth]
    bottom_left = img[twoThirdHeight:, :oneThirdWidth]

    top_centre = img[:oneThirdHeight, oneThirdWidth:twoThirdWidth]
    middle_centre = img[oneThirdHeight:twoThirdHeight,
                        oneThirdWidth:twoThirdWidth]
    bottom_centre = img[twoThirdHeight:, oneThirdWidth:twoThirdWidth]

    top_right = img[:oneThirdHeight, twoThirdWidth:]
    middle_right = img[oneThirdHeight:twoThirdHeight, twoThirdWidth:]
    bottom_right = img[twoThirdHeight:, twoThirdWidth:]

    # str1 = str(src)[:-7]
    add = '_off'
    if ('on' in src):
        add = '_on'

    str1 = "r1" + add

    path = 'res\Room1'
    cv2.imwrite(os.path.join(path, str1 + "_1" + '_tl.jpg'), top_left)
    cv2.imwrite(os.path.join(path, str1 + "_4" + '_ml.jpg'), middle_left)
    cv2.imwrite(os.path.join(path, str1 + "_7" + '_bl.jpg'), bottom_left)

    cv2.imwrite(os.path.join(path, str1 + "_2" + '_tc.jpg'), top_centre)
    cv2.imwrite(os.path.join(path, str1 + "_5" + '_mc.jpg'), middle_centre)
    cv2.imwrite(os.path.join(path, str1 + "_8" + '_bc.jpg'), bottom_centre)

    cv2.imwrite(os.path.join(path, str1 + "_3" + '_tr.jpg'), top_right)
    cv2.imwrite(os.path.join(path, str1 + "_6" + '_mr.jpg'), middle_right)
    cv2.imwrite(os.path.join(path, str1 + "_9" + '_br.jpg'), bottom_right)

    cv2.waitKey(0)


source_off = 'res\Lab-Sketch1-off-01.png'
cut9(source_off)

source_on = 'res\Lab-Sketch1-on-01.png'
cut9(source_on)
