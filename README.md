# ember-tailwind-codemod

A Codemod to convert plain CSS class definitions into [Tailwind](https://tailwindcss.com) utilities for your Ember Components

### Installation

```
npm install --global ember-tailwind-codemod
```

## Usage

To run the codemod, you would enter the following command in your terminal:

```
npx ember-tailwind-codemod  path/of/files/ or/some**/*glob.js --css=dist/assets

# or

yarn global add ember-tailwind-codemod
ember-tailwind-codemod  path/of/files/ or/some**/*glob.js --css=dist/assets
```

You have to pass the CSS build assets dir path to parse the CSS for conversion. **It is mandatory**
```
npx ember-tailwind-codemod app/templates --css=dist/assets/
```

You have to setup [Tailwind CSS](https://tailwindcss.com) manually for your Ember project. This codemod will only do the conversion.

## Things to to before running the command
Before running the codemod in your Ember project, please ensure you generate the CSS assets through your build. Since the codemod needs the final CSS to parse your class definitions and generate the Tailwind utilities.

Something like the below command will do:
```
ember build --environment=production
```

## Logs
There are two log files that will be generated to assist you with Tailwind migration. They are
- `UNMAPPED_SELECTORS.txt` => Contains the selectors in your CSS for which there is no conversion.
- `UNCHANGED_COMPONENTS.txt` => Contains the list of component names for which the class attributes are not changed.

By looking at the above files, after running the codemods, you can manually complete the migration because the codemod won't be able to do 100% migration of your CSS and some manual intervention is required.


## How it works?
- First it constructs the Tailwind utilities from your CSS selectors and store it in a map.
- Second, it will look into each of your hbs files for Components or ElementNodes with class attributes
- Then, it will try to find the selector mapping from the map from class names.
- Finally, if it have a mapping it will replace the class attribute values with Tailwind utilities.


## Local Usage
```
node ./bin/cli.js path/of/files/ or/some**/*glob.js
```

## Transforms

<!--TRANSFORMS_START-->
* [tailwind](transforms/tailwind/README.md)
<!--TRANSFORMS_END-->

## Contributing


### Running tests

* `yarn test`

### Update Documentation

* `yarn update-docs`

## FAQs
### Will the codemod automatically setup Tailwind for our projects?
**NO**, the codemod will only do the conversion to Tailwind utilities, you have to manually setup Tailwind for your Ember project. 
You can take a look at the following resources for the same:
- https://github.com/embermap/ember-cli-tailwind
- https://embermap.com/topics/using-functional-css-with-ember/getting-started-with-tailwind-css
- https://dev.to/jamesbyrne/using-tailwindcss-with-ember-41el
- https://www.mylittletechlife.com/setting-up-tailwindcss-with-ember-in-2020
- https://balinterdi.com/blog/ember-tailwind-css-postcss-import/

## Are there any caveats?
Yes, for the first cut, this codemod will only be able to support class name conversions, which means, other CSS selectors like element name, parent-child, nested selectors are 
not supported yet. But it is definitely possible in the future and I am working on it. And I could really use some help with Pull Requests.

## How do I know which things are not converted or omitted?
You can inspect the generated log files to check for the same. More info at [logs](#logs)
