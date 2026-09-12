from pathlib import Path

root = Path(r"C:\Users\charles\Desktop\作品集网站")
src = next(p for p in (root / "第三次修改").iterdir() if p.suffix.lower() == ".svg")
dst = root / "public" / "works" / "branding.svg"
dst.parent.mkdir(parents=True, exist_ok=True)
dst.write_bytes(src.read_bytes())
print("copied", src.name, "->", dst, "bytes", dst.stat().st_size)
