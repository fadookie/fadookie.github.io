# eliotlash.com

This is the source code for the [Jekyll static site](https://jekyllrb.com) for [eliotlash.com](https://www.eliotlash.com).

## Install

[Install Jekyll pre-requisites](https://jekyllrb.com/docs/). Ruby 3.0.7 or higher is recommended, my current version of Ruby used for development is listed in [.ruby-version](./.ruby-version). Then, `bundle install`.

### macOS Notes
I've been using [rvm](https://rvm.io) to manage Ruby versions. I received a compilation error in `eventmachine` when trying to `bundle install` on macOS with a missing openssl header. Here was the workaround using [Homebrew](https://brew.sh):
```
brew install openssl
brew link --force openssl
gem install eventmachine -- --with-cppflags=-I/usr/local/opt/openssl/include
bundle install
```

## Development

Serve development site by running `./serve.sh`.

### Updating categories

Unfortunately, categories for documents in [works](./works) collection must be updated in a few places:
* The front matter for the individual page lists what `categories` it's in.
* If a new category is added, a shim page must be added under [portfolio](./portfolio) collection with the appropriate `selected_category` in the front matter.
* [portfolio-index.html](./_layouts/portfolio-index.html) has arrays for `categories` and `category_links` which must be updated with the category name and category portfolio page permalink respectively.