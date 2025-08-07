<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AetherStore</title>
    <style>
        /* --- General Setup --- */
        body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #121212; /* Rich dark background */
            color: #e0e0e0; /* Soft white text */
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }

        /* --- Main Content Card --- */
        .store-container {
            background-color: #1e1e1e; /* Slightly lighter card background */
            padding: 3em 3.5em;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
            max-width: 500px;
        }
        

        /* --- Typography --- */
        h1 {
            font-size: 2.75rem;
            font-weight: 700;
            margin-bottom: 0.25em;
            color: #ffffff;
        }

        p {
            font-size: 1.15rem;
            color: #a0a0a0; /* Softer text for subtitle */
            margin-bottom: 2.5em;
            line-height: 1.6;
        }

        /* --- Interactive Button --- */
        .cta-button {
            background: linear-gradient(45deg, #007BFF, #00BFFF); /* Vibrant blue gradient */
            color: white;
            border: none;
            border-radius: 12px;
            padding: 16px 32px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .cta-button:hover {
            transform: translateY(-4px); /* Lifts the button on hover */
            box-shadow: 0 8px 25px rgba(0, 123, 255, 0.35); /* Adds a glow effect */
        }
    </style>
</head>
<body>

    <div class="store-container">
        <h1>🛍️ Welcome to AetherStore</h1>
        <p>Your one-stop shop for digital wonders is now live and ready to explore.</p>
        <button class="cta-button">Explore Products</button>
    </div>

</body>
</html>
