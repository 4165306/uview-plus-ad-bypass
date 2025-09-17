# uView Plus Ad Bypass

A Tampermonkey userscript that bypasses ad verification, simulates VIP access, and blocks Google ads on uView Plus documentation websites.

## Features

- Bypasses ad verification requests on uView Plus documentation sites
- Simulates VIP status to remove ad-related restrictions
- Blocks Google Ads (AdSense, DoubleClick, FundingChoices)
- Removes QR code prompts and ad popups
- Works on multiple uView Plus domain variants

## Supported Sites

- https://uiadmin.net/*
- https://*.uiadmin.net/*
- https://uview-plus.jiangruyi.com/*
- https://uview-plus.lingyun.net/*

## Installation

1. Make sure you have Tampermonkey installed in your browser
2. Click the "Install" button on the [Greasy Fork page](https://greasyfork.org/scripts/535688)
3. The script will automatically update when new versions are released

## How It Works

The script uses two main techniques:
- Overrides `fetch()` and `XMLHttpRequest` to modify API responses, simulating VIP status
- Blocks ad-related components and requests from loading on the page

## License

MIT License

## Author

WanliZhong

## Support

For issues and support, visit: https://uview-plus.lingyun.net/cooperation/about.html
