# jsonresume-theme-onepage-efficient

Originally by Ainsley Chong, Ive modified this to provide a few more helpful things:
* Grouping jobs by company
* Skills moved to the top
* Dates rendered as <3 word abbr> <year> (eg. Nov 2007, Mar 1998, etc.)
* Print margins smaller to take up more of the page

A compact theme for JSON Resume, designed for printing. 

Tries to fit as much information as possible onto a single page without making sections look cluttered.

## Example

http://themes.jsonresume.org/theme/onepage

## Running

```
sudo npm install -g resume-cli
git clone https://github.com/MetroidHunter/jsonresume-theme-onepage-efficient.git
cd jsonresume-theme-onepage-efficient
resume serve
```
You can print directly from the served html.

## Options

For the "experience" and "skills" sections, you can optionally replace the "highlights" list with a "details" list with this format:

```
"details": [
  { "text": "Javascript", "comment": "expert" },
  { "text": "Coffeescript", "comment": "expert" },
  { "text": "Ruby", "comment": "competent" },
  { "text": "Java", "comment": "novice" }
]
```

See included resume.json for more details.

