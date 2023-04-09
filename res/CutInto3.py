import cv2


def cut3(src):

    img = cv2.imread(src)

    # cv2.imread() -> takes an image as an input
    h, w, channels = img.shape

    oneThirdWidth = w//3
    twoThirdWidth = (w*2)//3
    height = h

    left = img[:, :oneThirdWidth]
    centre = img[:, oneThirdWidth:twoThirdWidth]
    right = img[:, twoThirdWidth:]

    # str1 = str(src)[:-7]
    add = '_off'
    if ('on' in src):
        add = '_on'

    str1 = "r3" + add
    cv2.imwrite(str1 + "_1" + '_l.jpg', left)
    cv2.imwrite(str1 + "_2" + '_c.jpg', centre)
    cv2.imwrite(str1 + "_3" + '_r.jpg', right)

    cv2.waitKey(0)


src1 = "Lab-Sketch3-off-01.png"
src2 = "Lab-Sketch3-on-01.png"

cut3(src1)
cut3(src2)
