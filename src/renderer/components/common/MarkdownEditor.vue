<template>
  <div class="editor-container">
    <textarea id="editor"></textarea>
  </div>
</template>

<style>
.editor-container{
  /* margin-top: 80px; */
  min-width: 300px;
  min-height: 100px;
}
</style>


<script>
import SimpleMDE from 'simplemde';
import marked from 'marked';
import DOMPurify from 'dompurify';
import 'simplemde/dist/simplemde.min.css';
import 'simplemde/dist/simplemde.min.js';

const customSimpleMDE={
  drawInlineFormula: (editor) => {
    var cm = editor.codemirror;
    var output = '';
    var selectedText = cm.getSelection();
    var text = selectedText || 'x = (-b \\pm \\sqrt{b^2-4ac})/(2a)';
    output = '$$$' + text + '$$$';
    cm.replaceSelection(output);
  },
  drawBlockFormula: (editor) => {
    var cm = editor.codemirror;
    var output = '';
    var selectedText = cm.getSelection();
    var text = selectedText || 'x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}';
    output = '$$' + text + '$$';
    cm.replaceSelection(output);
  }
};

export default {
  name:"MarkdownEditor",
  data(){
    return {
      simplemde:null,
      hasChange:false
    }
  },
  props:{
    value:{
      type:String,
      default:() => ""
    }
  },
  watch:{
    value(val) {
      if (val === this.simplemde.value() && !this.hasChange) return
      this.simplemde.value(val)
    }
  },
  mounted(){
    this.simplemde = new SimpleMDE({
      element:document.getElementById("editor"),
      autosave: {
          enabled: true,
          uniqueId: String(Date.now()),
          delay: 1000,
      },
      hideIcons: ["guide", "heading","side-by-side","fullscreen"],
      spellChecker: false,
      tabSize: 4,
      renderingConfig: {
          codeSyntaxHighlighting: true
      },
      previewRender: function (plainText) {
          document.getElementById("editor-preview").innerHTML=marked(plainText, {
              sanitize: true,
              sanitizer: DOMPurify.sanitize,
              highlight: function (code, lang) {
                  try {
                      return hljs.highlight(lang,code).value;
                  } catch (error) {
                      return hljs.highlightAuto(code).value;
                  }
              }
          });
          MathJax.Hub.Queue(["Typeset",MathJax.Hub,"editor-preview"]);
          return document.getElementById("editor-preview").innerHTML;
      },
      status:false,
      toolbar: [{
              name: "bold",
              action: SimpleMDE.toggleBold,
              className: "MDI format-bold",
              title: "Bold",
          },
          {
              name: "italic",
              action: SimpleMDE.toggleItalic,
              className: "MDI format-italic",
              title: "Italic",
          },
          {
              name: "strikethrough",
              action: SimpleMDE.toggleStrikethrough,
              className: "MDI format-strikethrough",
              title: "Strikethrough",
          },
          "|",
          {
              name: "quote",
              action: SimpleMDE.toggleBlockquote,
              className: "MDI format-quote",
              title: "Quote",
          },
          {
              name: "unordered-list",
              action: SimpleMDE.toggleUnorderedList,
              className: "MDI format-list-bulleted",
              title: "Generic List",
          },
          {
              name: "ordered-list",
              action: SimpleMDE.toggleOrderedList,
              className: "MDI format-list-numbers",
              title: "Numbered List",
          },
          "|",
          {
              name: "code",
              action: SimpleMDE.toggleCodeBlock,
              className: "MDI code-tags",
              title: "Create Code",
          },
          {
              name: "link",
              action: SimpleMDE.drawLink,
              className: "MDI link-variant",
              title: "Insert Link",
          },
          {
              name: "image",
              action: SimpleMDE.drawImage,
              className: "MDI image-area",
              title: "Insert Image",
          },
          {
              name: "inline-formula",
              action: customSimpleMDE.drawInlineFormula,
              className: "MDI alpha",
              title: "Inline Formula",
          },
          {
              name: "block-formula",
              action: customSimpleMDE.drawBlockFormula,
              className: "MDI beta",
              title: "Block Formula",
          },
          "|",
          {
              name: "preview",
              action: SimpleMDE.togglePreview,
              className: "MDI eye no-disable",
              title: "Toggle Preview",
          },
      ],
    });
    if(this.value){
      this.simplemde.value(this.value);
    }
    this.simplemde.codemirror.on('change', () => {
      if (this.hasChange) {
        this.hasChange = true
      }
      this.$emit('input', this.simplemde.value())
    })
  },
  destroyed(){
    this.simplemde.toTextArea()
    this.simplemde = null
  }
}
</script>
