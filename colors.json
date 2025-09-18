import json

# Tailwind color equivalents of the mockup palette
color_palette = {
    "background": {
        "main": "slate-100",    # #F4F5F7
        "card": "white",        # #FFFFFF
        "navbar": "slate-800"   # #1E293B
    },
    "text": {
        "primary": "gray-900",      # #111827
        "secondary": "gray-500",    # #6B7280
        "navbarTitle": "white"      # #FFFFFF
    },
    "buttons": {
        "addJob": "blue-600",       # #2563EB
        "addJobHover": "blue-500",  # #3B82F6
        "saveJob": "green-500",     # #22C55E
        "cancel": "red-500"         # #EF4444
    },
    "statusBadges": {
        "accepted": "green-500",    # #10B981
        "pending": "yellow-400",    # #FACC15
        "rejected": "red-600",      # #DC2626
        "interview": "blue-500"     # #3B82F6
    },
    "icons": {
        "edit": "blue-500",         # #3B82F6
        "delete": "red-600"         # #DC2626
    }
}

# Save to JSON file
file_path = "/mnt/data/job_tracker_tailwind_colors.json"
with open(file_path, "w") as f:
    json.dump(color_palette, f, indent=4)

file_path
