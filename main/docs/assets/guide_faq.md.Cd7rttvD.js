import{_ as e,c as t,o,a5 as a}from"./chunks/framework.Cz2oDBlC.js";const m=JSON.parse('{"title":"Frequently Asked Questions","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"guide/faq.md","filePath":"guide/faq.md"}'),i={name:"guide/faq.md"},n=a('<h1 id="frequently-asked-questions" tabindex="-1">Frequently Asked Questions <a class="header-anchor" href="#frequently-asked-questions" aria-label="Permalink to &quot;Frequently Asked Questions&quot;">​</a></h1><nav class="table-of-contents"><ul><li><a href="#i-have-deployed-application-name-alongside-geonetwork-but-somehow-all-the-http-requests-going-to-geonetwork-end-up-failing-with-a-403-error-why">I have deployed Application Name alongside GeoNetwork, but somehow all the HTTP requests going to GeoNetwork end up failing with a 403 error, why?</a></li></ul></nav><h3 id="i-have-deployed-application-name-alongside-geonetwork-but-somehow-all-the-http-requests-going-to-geonetwork-end-up-failing-with-a-403-error-why" tabindex="-1"><em>I have deployed Application Name alongside GeoNetwork, but somehow all the HTTP requests going to GeoNetwork end up failing with a 403 error, why?</em> <a class="header-anchor" href="#i-have-deployed-application-name-alongside-geonetwork-but-somehow-all-the-http-requests-going-to-geonetwork-end-up-failing-with-a-403-error-why" aria-label="Permalink to &quot;_I have deployed Application Name alongside GeoNetwork, but somehow all the HTTP requests going to GeoNetwork end up failing with a 403 error, why?_&quot;">​</a></h3><p>There are several possible reasons for this:</p><ul><li>The attempted requests necessitate authentication (e.g. creating a record) but the session of the current user has expired; in this case, the user should log in again.</li><li>The XSRF protection mechanism is not working correctly; this can be complicated to set up, please refer to <a href="./deploy.html#authentication">this part of the documentation</a> to know more.</li></ul>',5),r=[n];function s(l,h,d,u,p,c){return o(),t("div",null,r)}const w=e(i,[["render",s]]);export{m as __pageData,w as default};