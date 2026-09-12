from pathlib import Path

root = Path(r"C:\Users\charles\Desktop\作品集网站")
src_dir = root / "第四次修改"
dst_dir = root / "public" / "works"
dst_dir.mkdir(parents=True, exist_ok=True)

rename = {
    "包装设计": "packaging.svg",
    "书籍设计": "book.svg",
    "海报设计": "poster.svg",
}

for path in src_dir.iterdir():
    stem = path.stem
    if path.suffix.lower() == ".pdf":
        print("skip pdf", path.name, path.stat().st_size)
        continue
    dest_name = rename.get(stem)
    if not dest_name:
        print("skip unmatched", path.name)
        continue
    dest = dst_dir / dest_name
    print("copying", path.name, "->", dest_name, "bytes", path.stat().st_size)
    dest.write_bytes(path.read_bytes())
    print("done", dest_name, dest.stat().st_size)
