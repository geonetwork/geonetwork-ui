import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { MarkdownParserComponent } from './markdown-parser.component'

export default {
  title: 'Elements/MarkdownParserComponent',
  component: MarkdownParserComponent,
  decorators: [
    moduleMetadata({
      imports: [MarkdownParserComponent],
    }),
  ],
} as Meta<MarkdownParserComponent>

export const Primary: StoryObj<MarkdownParserComponent> = {
  args: {
    whitoutStyles: false,
    textContent: ` 
# SUPPORTED MARKDOWN CONTENT

## 1) Headings

+ # h1 Heading
+ ## h2 Heading
+ ### h3 Heading
+ #### h4 Heading
+ ##### h5 Heading
+ ###### h6 Heading


## 2) Horizontal Rules

+ ___

+ ---

+ ***

## 3) Emphasis

+ **This is bold text**

+ __This is bold text__

+ *This is italic text*

+ _This is italic text_

+ ~~Strikethrough~~


## 3) Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## 4) Lists

**Unordered**

+ Create a list by starting a line with +, -, or *
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ List continue here

**Ordered**

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as 1.

**Start numbering with offset:**

57. foo
1. bar


## 5) Code

**Inline code**

(no example)

**Indented code**

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


**Block code "fences"**

(no example)


## 6) Tables

**Left aligned columns**

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

**Right aligned columns**

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |


## 7) Links

[link text](https://github.com/geonetwork/geonetwork-ui)

[link with title](https://github.com/geonetwork/geonetwork-ui "title text!")


## 8) Images

**With and without title**

![Geonetwork](https://geonetwork-opensource.org/_static/chrome/geonetwork3-logo.png "Geonetwork title")`,
  },
  argTypes: {
    textContent: {
      control: 'text',
    },
  },
  render: (args) => ({
    props: args,
    template: `<gn-ui-markdown-parser [whitoutStyles]="whitoutStyles" [textContent]="
    textContent
    "></gn-ui-markdown-parser>`,
  }),
}
