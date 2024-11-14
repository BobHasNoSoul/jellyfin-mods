import requests
import json
import os

# Jellyfin server configuration
base_url = "http://127.0.0.1:8096"  # Replace with your Jellyfin server's base URL
source_user_id = "PUTYOURSOURCEUSERIDHERE"    # Replace with the source user's ID
target_user_id = "PUTYOURTARGETSUSERIDHERE"    # Replace with the target user's ID
api_key = "PUTYOURAPIKEYHERE"             # Replace with your Jellyfin API key

# Define filename for storing favorite IDs
favorites_file = "userfavorites.txt"

# Step 1: Retrieve and save the source user's favorite item IDs to a file
def save_favorites_to_file():
    # Delete the file if it already exists
    if os.path.exists(favorites_file):
        os.remove(favorites_file)
        print(f"{favorites_file} deleted")

    # Create headers with the API key
    headers = {
        "X-Emby-Token": api_key
    }

    # Build the URL for getting the user's favorites
    favorites_url = f"{base_url}/Users/{source_user_id}/Items?Recursive=True&Filters=IsFavorite&Fields=Path"

    # Make a request to get the user's favorites
    response = requests.get(favorites_url, headers=headers)

    if response.status_code == 200:
        data = response.json()

        # Extract and save the id of each favorite item to a file
        with open(favorites_file, "w") as file:
            for item in data['Items']:
                id = item['Id']
                file.write(f"{id}\n")

        print("Favorites list saved to userfavorites.txt")
    else:
        print(f"Failed to retrieve favorites. Status code: {response.status_code}")

# Step 2: Add each item ID in userfavorites.txt to the target user's favorites
def duplicate_favorites_to_target_user():
    headers = {
        "X-Emby-Token": api_key
    }

    # Read each favorite ID from the file and add it to the target user's favorites
    if os.path.exists(favorites_file):
        with open(favorites_file, "r") as file:
            for line in file:
                item_id = line.strip()
                favorite_url = f"{base_url}/Users/{target_user_id}/FavoriteItems/{item_id}"
                response = requests.post(favorite_url, headers=headers)

                if response.status_code == 200:
                    print(f"Item {item_id} added to target user's favorites.")
                else:
                    print(f"item not added {item_id}. Status code: {response.status_code}")
    else:
        print(f"{favorites_file} does not exist. Run save_favorites_to_file() first.")

# Run the steps
save_favorites_to_file()
duplicate_favorites_to_target_user()
