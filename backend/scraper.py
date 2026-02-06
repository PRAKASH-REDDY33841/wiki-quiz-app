import requests
from bs4 import BeautifulSoup


def scrape_wikipedia(url: str):

    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    r = requests.get(url, headers=headers)

    if r.status_code != 200:
        raise Exception(f"Failed to fetch page: {r.status_code}")

    soup = BeautifulSoup(r.text, "html.parser")

    title = soup.find("h1").text

    paragraphs = soup.find_all("p")
    content = " ".join([p.text for p in paragraphs[:20]])

    sections = [h.text for h in soup.find_all("h2")]

    return {
        "title": title,
        "content": content,
        "sections": sections
    }
