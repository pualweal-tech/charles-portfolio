from pathlib import Path

svg = Path(r"C:\Users\charles\Desktop\作品集网站\第二次修改\顶部导航栏.svg")
out = Path(r"C:\Users\charles\Desktop\作品集网站\tmp-nav.png")
html = Path(r"C:\Users\charles\Desktop\作品集网站\tmp-nav.html")

try:
    import cairosvg

    cairosvg.svg2png(
        url=str(svg),
        write_to=str(out),
        background_color="#111111",
        output_width=2560,
        output_height=128,
    )
    print("cairosvg ok")
except Exception as e:
    print("cairosvg fail", e)
    html.write_text(
        f"""<!doctype html><html><body style="margin:0;background:#111">
        <img src="{svg.as_posix()}" width="1280" height="64" />
        </body></html>""",
        encoding="utf-8",
    )
    print("wrote html fallback")
