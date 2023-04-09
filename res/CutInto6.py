import cv2

# function to cut image into 6 equal parts


def cut6(src):

    img = cv2.imread(src)

    # cv2.imread() -> takes an image as an input
    h, w, channels = img.shape

    oneThirdWidth = w//3
    twoThirdWidth = (w*2)//3
    height = h//2

    top_left = img[:height, :oneThirdWidth]
    top_centre = img[:height, oneThirdWidth:twoThirdWidth]
    top_right = img[:height, twoThirdWidth:]

    bottom_left = img[height:, :oneThirdWidth]
    bottom_centre = img[height:, oneThirdWidth:twoThirdWidth]
    bottom_right = img[height:, twoThirdWidth:]

    # str1 = str(src)[:-7]
    add = '_off'
    if ('on' in src):
        add = '_on'

    str1 = "r2" + add
    cv2.imwrite(str1 + "_1" + '_tl.jpg', top_left)
    cv2.imwrite(str1 + "_2" + '_tc.jpg', top_centre)
    cv2.imwrite(str1 + "_3" + '_tr.jpg', top_right)
    cv2.imwrite(str1 + "_4" + '_bl.jpg', bottom_left)
    cv2.imwrite(str1 + "_5" + '_bc.jpg', bottom_centre)
    cv2.imwrite(str1 + "_6" + '_br.jpg', bottom_right)

    cv2.waitKey(0)


src1 = "res\Lab-Sketch2-off-01.png"
src2 = "res\Lab-Sketch2-on-01.png"

cut6(src1)
cut6(src2)
