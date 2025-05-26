import { RenderPlugin } from "@11ty/eleventy";

export default async function(eleventyConfig) {

  eleventyConfig.addPlugin(RenderPlugin, {
		tagName: "renderTemplate", // Change the renderTemplate shortcode name
		tagNameFile: "renderFile", // Change the renderFile shortcode name
		filterName: "renderContent", // Change the renderContent filter name
	});

	// Configure Eleventy
  eleventyConfig.addCollection("pageSections", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/sections/homepage-sections/*.md")
      .sort((a, b) => a.data.order - b.data.order);
  });
  
  // Pass through files
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("assets/js");
  eleventyConfig.addPassthroughCopy("*.css");
  eleventyConfig.addPassthroughCopy("{,!(_site)!(_site2)/**/}*.png");
  eleventyConfig.addPassthroughCopy("*.png");
  eleventyConfig.addPassthroughCopy("*.jpg");
  eleventyConfig.addPassthroughCopy("*.svg");
  eleventyConfig.addPassthroughCopy("*.ico");

  // Add custom filters
  eleventyConfig.addFilter("isNotEmpty", function(value) {
    if (typeof value === 'string') {
      return value.trim() !== '';
    } else if (value !== undefined && value !== null && typeof value === 'object') {
      return Object.keys(value).length > 0;
    }
    return !!value;
  });
  
  eleventyConfig.addFilter("relativeUrl", function(url) {
    if (url?.startsWith('http://')) {
      return url;
    }
    if (url?.startsWith('https://')) {
      return url;
    }
    return url?.startsWith('/') ? url : '/' + url;
  });
  
  eleventyConfig.addFilter("toAbsoluteUrl", function(url) {
    if(!url)
      return "";

    const baseUrl = 'https://drklaudiaraczko.co.uk';
    if (url?.startsWith('http')) {
      return url;
    }
    
    const result = baseUrl + (url?.startsWith('/') ? url : '/' + url);
    return result;
  });
  
  eleventyConfig.addFilter("formatDate", function(dateObj, format) {
    if (!dateObj) {
      return '';
    }
    if (format === 'short') {
      return dateObj.toString();
    } else {
      return DateTime.fromJSDate(dateObj).toFormat('cccc, LLLL d, yyyy');
    }
  });

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };

};