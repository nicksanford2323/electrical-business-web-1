import json
import re
import csv

def remove_logo_snippet(logo_url: str) -> str:
    """
    Removes the 'sXX-p-k-no-ns-nd' snippet (with optional trailing slash)
    from the Google logo URL. Example:
      '.../s44-p-k-no-ns-nd/photo.jpg' -> '.../photo.jpg'
    """
    return re.sub(r's\d+-p-k-no-ns-nd/?', '', logo_url)

# 1. LOAD THE ORIGINAL JSON
input_file = "business_data.json"
with open(input_file, "r", encoding="utf-8") as f:
    data = json.load(f)

# 2. UPDATE EACH LOGO URL
for place_id, place_data in data.items():
    if "businessInfo" in place_data:
        biz_info = place_data["businessInfo"]
        if "logo" in biz_info and biz_info["logo"]:
            original_logo = biz_info["logo"]
            cleaned_logo = remove_logo_snippet(original_logo)
            biz_info["logo"] = cleaned_logo

# 3. WRITE OUT THE CLEANED JSON
output_file = "business_data_updated.json"
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Cleaned JSON written to: {output_file}")

# 4. CREATE A CSV OF BUSINESS NAME, PLACE ID, CITY, REVIEWS LINK, & CUSTOM URL
csv_file = "business_data_summary.csv"
with open(csv_file, "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    # Write header
    writer.writerow(["Business Name", "Place ID", "City", "Reviews Link", "Custom URL"])

    for place_id, place_data in data.items():
        business_name = place_data.get("businessName", "")
        biz_info = place_data.get("businessInfo", {})
        city = biz_info.get("city", "")
        reviews_link = biz_info.get("reviews_link", "")

        # Build the custom URL for each business
        custom_url = f"https://nicksanford2323.github.io/BAMAELECTRIC?id={place_id}"

        writer.writerow([business_name, place_id, city, reviews_link, custom_url])

print(f"CSV summary written to: {csv_file}")

