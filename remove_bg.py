from PIL import Image

def make_transparent(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        # Distance from pure white
        # item is (R, G, B, A)
        r, g, b, a = item
        
        # Calculate how close the pixel is to white (255, 255, 255)
        # If it's very close to white, make it transparent
        # We use a smoothed alpha transition
        avg = (r + g + b) / 3.0
        
        if avg > 245:
            # completely white/transparent
            newData.append((255, 255, 255, 0))
        elif avg > 200:
            # transition phase for anti-aliasing
            # mapping 200 -> 255 alpha, 245 -> 0 alpha
            alpha = int(255 * (245 - avg) / 45.0)
            newData.append((r, g, b, alpha))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    make_transparent('public/logo-footer.jpg', 'public/logo-footer-transparent.png')
    print("Done")
