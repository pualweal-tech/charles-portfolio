from pathlib import Path

MIME_EXT = {
    b"jpeg": "jpg",
    b"jpg": "jpg",
    b"png": "png",
    b"webp": "webp",
    b"gif": "gif",
}


def externalize(src: Path, dest: Path, asset_dir: Path, url_prefix: str) -> None:
    asset_dir.mkdir(parents=True, exist_ok=True)
    marker = b"data:image/"
    n = 0
    copied = 0
    with src.open("rb") as inf, dest.open("wb") as out:
        buf = b""
        while True:
            chunk = inf.read(8 * 1024 * 1024)
            if not chunk:
                if buf:
                    out.write(buf)
                break
            buf += chunk
            while True:
                i = buf.find(marker)
                if i < 0:
                    keep = max(0, len(buf) - (len(marker) - 1))
                    out.write(buf[:keep])
                    copied += keep
                    buf = buf[keep:]
                    break
                out.write(buf[:i])
                rest = buf[i + len(marker) :]
                semi = rest.find(b";base64,")
                if semi < 0:
                    # marker split across chunks; wait for more data
                    buf = buf[i:]
                    break
                mime = rest[:semi].split(b"+", 1)[0]
                payload = rest[semi + 8 :]
                end = payload.find(b'"')
                if end < 0:
                    buf = buf[i:]
                    break
                raw = payload[:end].replace(b"\n", b"").replace(b"\r", b"")
                import base64

                n += 1
                ext = MIME_EXT.get(mime, "bin")
                name = f"{n:02d}.{ext}"
                (asset_dir / name).write_bytes(base64.b64decode(raw))
                out.write(f"{url_prefix}/{name}".encode("ascii"))
                buf = payload[end:]
                print("extracted", name, mime.decode(), "bytes", (asset_dir / name).stat().st_size)
    print("done", src.name, "images", n, "out", dest, dest.stat().st_size)


if __name__ == "__main__":
    root = Path("public/works")
    jobs = [
        ("poster.svg", "poster.svg", "poster", "/works/poster"),
        ("book.svg", "book.svg", "book", "/works/book"),
        ("branding.svg", "branding.svg", "branding", "/works/branding"),
        ("packaging.svg", "packaging.svg", "packaging", "/works/packaging"),
    ]
    for src_name, dest_name, folder, prefix in jobs:
        src = root / src_name
        if not src.exists():
            print("missing", src)
            continue
        tmp = root / f"{dest_name}.slim"
        externalize(src, tmp, root / folder, prefix)
        tmp.replace(src)
        print("replaced", src, "size", src.stat().st_size)
