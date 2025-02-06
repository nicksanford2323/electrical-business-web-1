import json
import csv

def extract_business_info():
    try:
        # Read the local JSON file
        with open('46.json', 'r') as file:
            data = json.load(file)

        # Create and write to CSV
        with open('business_info.csv', 'w', newline='') as csvfile:
            writer = csv.writer(csvfile)
            # Write header
            writer.writerow(['Place ID', 'Business Name', 'Phone'])

            # Extract info for each business
            for place_id, business_data in data.items():
                business_name = business_data.get('businessName', '')
                phone = business_data.get('businessInfo', {}).get('phone', '')
                writer.writerow([place_id, business_name, phone])

        print("Data successfully saved to business_info.csv")

    except FileNotFoundError:
        print("Error: 46.json file not found")
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    extract_business_info()