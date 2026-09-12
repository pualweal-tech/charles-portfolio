import os
import cv2
import numpy as np

src = r"C:\Users\charles\Desktop\作品集网站\第二次修改\portrait.mp4"
out = r"C:\Users\charles\Desktop\作品集网站\tmp-frames\keyed.png"
os.makedirs(os.path.dirname(out), exist_ok=True)

cap = cv2.VideoCapture(src)
cap.set(cv2.CAP_PROP_POS_FRAMES, 1)
ok, bgr = cap.read()
cap.release()
if not ok:
    raise SystemExit("no frame")

rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)
h, w = rgb.shape[:2]
# sample corners for bg color
corners = np.concatenate(
    [
        rgb[0:20, 0:20].reshape(-1, 3),
        rgb[0:20, w - 20 :].reshape(-1, 3),
        rgb[h - 20 :, 0:20].reshape(-1, 3),
        rgb[h - 20 :, w - 20 :].reshape(-1, 3),
    ]
)
bg = corners.mean(axis=0)
print("bg", bg, "size", w, h)

diff = np.linalg.norm(rgb.astype(np.float32) - bg, axis=2)
# white-ish: low saturation high value
hsv = cv2.cvtColor(bgr, cv2.COLOR_BGR2HSV)
sat = hsv[:, :, 1].astype(np.float32)
val = hsv[:, :, 2].astype(np.float32)
# alpha 0 for bright low-sat
whiteness = (val / 255.0) * (1.0 - sat / 255.0)
alpha = np.clip((0.78 - whiteness) / 0.28, 0, 1)
# also use color distance
alpha2 = np.clip((diff - 18.0) / 40.0, 0, 1)
alpha = np.minimum(alpha, alpha2)

rgba = np.dstack([rgb, (alpha * 255).astype(np.uint8)])
# composite on black for preview
black = np.zeros_like(rgb)
comp = (rgb.astype(np.float32) * alpha[..., None] + black * (1 - alpha[..., None])).astype(np.uint8)
preview = np.concatenate([rgb, comp], axis=1)
cv2.imwrite(out, cv2.cvtColor(preview, cv2.COLOR_RGB2BGR))
print("wrote", out, "alpha mean", alpha.mean(), "alpha min/max", alpha.min(), alpha.max())
