# tailwind


## Usage

```
npx ember-tailwind-codemod tailwind path/of/files/ or/some**/*glob.hbs

# or

yarn global add ember-tailwind-codemod
ember-tailwind-codemod tailwind path/of/files/ or/some**/*glob.hbs
```

## Local Usage
```
node ./bin/cli.js tailwind path/of/files/ or/some**/*glob.hbs
```

## Input / Output

<!--FIXTURES_TOC_START-->
* [basic](#basic)
<!--FIXTURES_TOC_END-->

<!--FIXTURES_CONTENT_START-->
---
<a id="basic">**basic**</a>

**Input** (<small>[basic.input.hbs](transforms/tailwind/__testfixtures__/basic.input.hbs)</small>):
```hbs
<HelloWorld class="hello" />
<HelloWorld class="etc-opacity-0" />
<HelloWorld class="etc-opacity-1" />
<HelloWorld class="etc-float-left" />
<HelloWorld class="etc-float-right" />
<HelloWorld class="etc-clear-left" />
<HelloWorld class="etc-clear-right" />
<HelloWorld class="etc-clear-both" />
<HelloWorld class="etc-clear-none" />

```

**Output** (<small>[basic.output.hbs](transforms/tailwind/__testfixtures__/basic.output.hbs)</small>):
```hbs
<HelloWorld class="text-center m-0 underline display-block p-0 overflow-auto" />
<HelloWorld class="opacity-0" />
<HelloWorld class="opacity-100" />
<HelloWorld class="float-left" />
<HelloWorld class="float-right" />
<HelloWorld class="clear-left" />
<HelloWorld class="clear-right" />
<HelloWorld class="clear-both" />
<HelloWorld class="clear-none" />

```
<!--FIXTURES_CONTENT_END-->