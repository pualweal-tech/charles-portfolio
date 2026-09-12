import os

path = r"C:\Users\charles\Desktop\作品集网站\第二次修改\portrait.mp4"
out_dir = r"C:\Users\charles\Desktop\作品集网站\tmp-frames"
os.makedirs(out_dir, exist_ok=True)

try:
    import cv2

    cap = cv2.VideoCapture(path)
    frames = cap.get(cv2.CAP_PROP_FRAME_COUNT)
    fps = cap.get(cv2.CAP_PROP_FPS) or 24
    w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    dur = frames / fps if fps else 0
    print(f"size={w}x{h} fps={fps:.2f} frames={int(frames)} duration={dur:.2f}s")
    for i, t in enumerate([0.05, 0.5, 0.95]):
        cap.set(cv2.CAP_PROP_POS_MSEC, t * dur * 1000)
        ok, img = cap.read()
        if ok:
            out = os.path.join(out_dir, f"turn_{i}.jpg")
            cv2.imwrite(out, img, [int(cv2.IMWRITE_JPEG_QUALITY), 90])
            print("wrote", out)
    cap.release()
except Exception as e:
    print("cv2 fail", type(e), e)
