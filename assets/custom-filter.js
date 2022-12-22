const addCustomColorFilters = () => {
  let html = ``;
  const queryString = window.location.search;

  colorFilters.forEach(filter => {
    const originalColorFilters = filter.original_filters.split(",");

    const isOriginalColorFilters = originalColorFilters.find((originalFilter) => {
      const originalColorFilterInput = document.querySelector('[data-armada-selector="filter-main-form"] [data-aid="filter-category-color"] [data-armada-selector="filter_input_list"] div:not(.custom-color-filter) [value="' + originalFilter + '"]');
      if (originalColorFilterInput) {
        return true;
      }
      return false;
    });

    if (isOriginalColorFilters) {

      let checked = "";

      const isOriginalCheckedColorFilters = originalColorFilters.find((originalFilter) => {
        const originalColorFilterInput = document.querySelector('[data-armada-selector="filter-main-form"] [data-aid="filter-category-color"] [data-armada-selector="filter_input_list"] div:not(.custom-color-filter) [value="' + originalFilter + '"]');
        if (originalColorFilterInput && originalColorFilterInput.hasAttribute('checked')) {
          return true;
        }
        return false;
      });
      if (isOriginalCheckedColorFilters) {
        checked = "checked";
      }

      html += `
      <div class="flex pb-3 flex-row-reverse justify-end items-center custom-color-filter">
        <label class="font-heading heading-case relative top-[0.5px] cursor-pointer" for="custom-${filter.merged_filter}-1-filter_form">${filter.merged_filter}</label>
        <input type="checkbox" placeholder="" name="custom-color-filter" value="${filter.merged_filter}" class="bg-page border-body mr-3 appearance-none cursor-pointer active:bg-none checked:bg-none active:text-body checked:text-body checked:bg-current active:bg-body disabled:opacity-30" data-filters-for="${filter.original_filters}" id="custom-${filter.merged_filter}-1-filter_form" data-armada-selector="custom-color-filter=${filter.merged_filter}" data-aid="input-custom-${filter.merged_filter}" ${checked}>
      </div>`;
    }
  });

  document.querySelector('[data-armada-selector="filter-main-form"] [data-aid="filter-category-color"] [data-armada-selector="filter_input_list"]').insertAdjacentHTML('afterbegin', html);
}

const hideOriginalColorFilters = () => {
  colorFilters.forEach(filter => {
    const originalColorFilters = filter.original_filters.split(",");
    for (let j = 0; j < originalColorFilters.length; j++) {
      const originalColorFilterInput = document.querySelector('[data-armada-selector="filter-main-form"] [data-aid="filter-category-color"] [data-armada-selector="filter_input_list"] div:not(.custom-color-filter) [value="' + originalColorFilters[j] + '"]');
      if (originalColorFilterInput) {
        originalColorFilterInput.parentElement.classList.add('hidden');
      }
    }
  });
}

const updateActiveFacetCount = () => {
  let hiddenActiveColorFilterCount = 0;
  let activeCustomFilterCount = 0;

  const hiddenActiveColorFilterInputs = document.querySelectorAll('[data-armada-selector="filter-main-form"] [data-aid="filter-category-color"] [data-armada-selector="filter_input_list"] .items-center.hidden input:checked');
  if (hiddenActiveColorFilterInputs) {
    hiddenActiveColorFilterCount = hiddenActiveColorFilterInputs.length;
  }

  const activeCustomColorFilterInputs = document.querySelectorAll('[data-armada-selector="filter-main-form"] [data-aid="filter-category-color"] [data-armada-selector="filter_input_list"] .custom-color-filter input:checked');
  if (activeCustomColorFilterInputs) {
    activeCustomFilterCount = activeCustomColorFilterInputs.length;
  }

  const colorFilterSelectedSpanElement = document.querySelector('[data-armada-selector="filter-main-form"] [data-aid="filter-category-color"] summary [data-armada-selected-filters-count]');
  if (colorFilterSelectedSpanElement) {
    let countText = colorFilterSelectedSpanElement.innerHTML.replace(/\D/g, '');
    if (countText != '') {
      let count = parseInt(countText) - hiddenActiveColorFilterCount + activeCustomFilterCount;

      colorFilterSelectedSpanElement.innerHTML = ` (${count})`;
    }    
  }

  const totalFilterSelectedSpanElement = document.querySelector('[data-modal-id="filter-modal-trigger"] [data-armada-selector="active-facet-count"]');
  if (totalFilterSelectedSpanElement) {
    let countText = totalFilterSelectedSpanElement.innerHTML.replace(/\D/g, '');
    if (countText != '') {
      let count = parseInt(countText) - hiddenActiveColorFilterCount + activeCustomFilterCount;

      totalFilterSelectedSpanElement.innerHTML = ` (${count})`;
    }    
  }
}

const updateActiveFacets = () => {
  const queryString = window.location.href;
  
  const customActiveColorFilterElements = document.querySelectorAll('[data-armada-selector="filter-main-form"] [data-aid="filter-category-color"] .custom-color-filter input:checked');
  if (customActiveColorFilterElements) {
    let html = ``;
    const form = document.querySelector("#filter_form");
    customActiveColorFilterElements.forEach(customActiveColorFilterElement => {
      let newUrl = queryString.replace( 'custom-color-filter=' + customActiveColorFilterElement.value.replace(' ', '+'), '');
      const colorFilters = customActiveColorFilterElement.getAttribute('data-filters-for').split(",");
      for (let j = 0; j < colorFilters.length; j++) {
        newUrl = newUrl.replace('filter.v.option.color='+encodeURI(colorFilters[j]), '');
        newUrl = newUrl.replace('filter.v.option.color='+colorFilters[j].replaceAll(' ', '+'), '');
        newUrl = newUrl.replace('filter.v.option.color='+encodeURI(colorFilters[j].replaceAll(' ', '+')), '');
        newUrl = newUrl.replace('filter.v.option.color='+escape(colorFilters[j]), '');
        newUrl = newUrl.replace('filter.v.option.color='+escape(colorFilters[j].replaceAll(' ', '+')), '');
      }
      html += `
        <facet-remove class="grid pr-3 max-w-max mb-3 grid-cols-1 grid-rows-1 custom-color-active-filter">
          <div class="block bg-body opacity-10 col-start-1 col-end-2 row-start-1 row-end-2"></div>
          <a href="${newUrl}" class="block pl-[12px] pr-2 py-1 col-start-1 col-end-2 row-start-1 row-end-2 z-50 relative after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:pointer-events-none after:border after:opacity-0 after:transition-opacity after:duration-300 hover:after:opacity-100" data-armada-selector="active-facets-button" data-aid="active-filter-${customActiveColorFilterElement.value}">
            <span class="flex justify-between items-center">
              <span>${customActiveColorFilterElement.value}</span>
              <svg data-aid="icon-cancel" width="8" height="8" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-hover-classes ml-2">
                <rect width="20.6878" height="1.5" transform="matrix(0.70711 -0.707104 0.70711 0.707104 0.155396 14.7839)" fill="currentColor"></rect>
                <rect width="20.6878" height="1.5" transform="matrix(-0.70711 -0.707104 0.70711 -0.707104 14.7839 15.8445)" fill="currentColor"></rect>
              </svg>
              <span class="sr-only">Clear</span>
            </span>
          </a>
        </facet-remove>
      `;
    });
    if (document.querySelector('[data-armada-selector="filter-main-form"] .active-facets [data-armada-selector="active_facet_container"] [data-armada-selector="filters_clear_all"]')) {
      document.querySelector('[data-armada-selector="filter-main-form"] .active-facets [data-armada-selector="active_facet_container"] [data-armada-selector="filters_clear_all"]').insertAdjacentHTML('beforebegin', html);
    }
  }

  const originalActiveFacetElements = document.querySelectorAll('[data-armada-selector="filter-main-form"] .active-facets facet-remove:not(.custom-color-active-filter)');
  if (originalActiveFacetElements) {
    for (let j=0; j<originalActiveFacetElements.length; j++) {
      
      const orignalFilter = originalActiveFacetElements[j].querySelector('a span span:first-child'); 
      const originalHiddenColorFilterInputs = document.querySelectorAll('[data-armada-selector="filter-main-form"] [data-aid="filter-category-color"] [data-armada-selector="filter_input_list"] .hidden input');
      if (originalHiddenColorFilterInputs && orignalFilter) {
        for ( let i=0; i<originalHiddenColorFilterInputs.length; i++) {
          if (orignalFilter.innerHTML == originalHiddenColorFilterInputs[i].value) {
            originalActiveFacetElements[j].classList.add('hidden');
            break;
          }
        }
      }
    }
  }
}

const addCustomSizeFilters = () => {
  let html = ``;
  const queryString = window.location.search;

  sizeFilters.forEach(filter => {
    const originalSizeFilters = filter.original_filters.split(",");

    const isOriginalSizeFilters = originalSizeFilters.find((originalFilter) => {
      const originalSizeFilterInput = document.querySelector('[data-armada-selector="filter-main-form"] [data-aid="filter-category-size"] [data-armada-selector="filter_input_list"] div:not(.custom-size-filter) [value="' + originalFilter + '"]');
      if (originalSizeFilterInput) {
        return true;
      }
      return false;
    });

    if (isOriginalSizeFilters) {

      let checked = "";

      const isOriginalCheckedSizeFilters = originalSizeFilters.find((originalFilter) => {
        const originalSizeFilterInput = document.querySelector('[data-armada-selector="filter-main-form"] [data-aid="filter-category-size"] [data-armada-selector="filter_input_list"] div:not(.custom-size-filter) [value="' + originalFilter + '"]');
        if (originalSizeFilterInput && originalSizeFilterInput.hasAttribute('checked')) {
          return true;
        }
        return false;
      });
      if (isOriginalCheckedSizeFilters) {
        checked = "checked";
      }

      html += `
      <div class="flex pb-3 flex-row-reverse justify-end items-center custom-size-filter">
        <label class="font-heading heading-case relative top-[0.5px] cursor-pointer" for="custom-${filter.merged_filter}-1-filter_form">${filter.merged_filter}</label>
        <input type="checkbox" placeholder="" name="custom-size-filter" value="${filter.merged_filter}" class="bg-page border-body mr-3 appearance-none cursor-pointer active:bg-none checked:bg-none active:text-body checked:text-body checked:bg-current active:bg-body disabled:opacity-30" data-filters-for="${filter.original_filters}" id="custom-${filter.merged_filter}-1-filter_form" data-armada-selector="custom-size-filter=${filter.merged_filter}" data-aid="input-custom-${filter.merged_filter}" ${checked}>
      </div>`;
    }
  });

  document.querySelector('[data-armada-selector="filter-main-form"] [data-aid="filter-category-size"] [data-armada-selector="filter_input_list"]').insertAdjacentHTML('afterbegin', html);
}

const hideOriginalSizeFilters = () => {
  sizeFilters.forEach(filter => {
    const originalSizeFilters = filter.original_filters.split(",");
    for (let j = 0; j < originalSizeFilters.length; j++) {
      const originalSizeFilterInput = document.querySelector('[data-armada-selector="filter-main-form"] [data-aid="filter-category-size"] [data-armada-selector="filter_input_list"] div:not(.custom-size-filter) [value="' + originalSizeFilters[j] + '"]');
      if (originalSizeFilterInput) {
        originalSizeFilterInput.parentElement.classList.add('hidden');
      }
    }
  });
}

const updateSizeActiveFacetCount = () => {
  let hiddenActiveSizeFilterCount = 0;
  let activeCustomFilterCount = 0;

  const hiddenActiveSizeFilterInputs = document.querySelectorAll('[data-armada-selector="filter-main-form"] [data-aid="filter-category-size"] [data-armada-selector="filter_input_list"] .items-center.hidden input:checked');
  if (hiddenActiveSizeFilterInputs) {
    hiddenActiveSizeFilterCount = hiddenActiveSizeFilterInputs.length;
  }

  const activeCustomSizeFilterInputs = document.querySelectorAll('[data-armada-selector="filter-main-form"] [data-aid="filter-category-size"] [data-armada-selector="filter_input_list"] .custom-size-filter input:checked');
  if (activeCustomSizeFilterInputs) {
    activeCustomFilterCount = activeCustomSizeFilterInputs.length;
  }

  const sizeFilterSelectedSpanElement = document.querySelector('[data-armada-selector="filter-main-form"] [data-aid="filter-category-size"] summary [data-armada-selected-filters-count]');
  if (sizeFilterSelectedSpanElement) {
    let countText = sizeFilterSelectedSpanElement.innerHTML.replace(/\D/g, '');
    if (countText != '') {
      let count = parseInt(countText) - hiddenActiveSizeFilterCount + activeCustomFilterCount;

      sizeFilterSelectedSpanElement.innerHTML = ` (${count})`;
    }    
  }

  const totalFilterSelectedSpanElement = document.querySelector('[data-modal-id="filter-modal-trigger"] [data-armada-selector="active-facet-count"]');
  if (totalFilterSelectedSpanElement) {
    let countText = totalFilterSelectedSpanElement.innerHTML.replace(/\D/g, '');
    if (countText != '') {
      let count = parseInt(countText) - hiddenActiveSizeFilterCount + activeCustomFilterCount;

      totalFilterSelectedSpanElement.innerHTML = ` (${count})`;
    }    
  }
}

const updateSizeActiveFacets = () => {
  const queryString = window.location.href;
  
  const customActiveSizeFilterElements = document.querySelectorAll('[data-armada-selector="filter-main-form"] [data-aid="filter-category-size"] .custom-size-filter input:checked');
  if (customActiveSizeFilterElements) {
    let html = ``;
    const form = document.querySelector("#filter_form");
    customActiveSizeFilterElements.forEach(customActiveSizeFilterElement => {
      let newUrl = queryString.replace( 'custom-size-filter=' + customActiveSizeFilterElement.value.replace(' ', '+'), '');
      const sizeFilters = customActiveSizeFilterElement.getAttribute('data-filters-for').split(",");
      for (let j = 0; j < sizeFilters.length; j++) {
        newUrl = newUrl.replace('filter.v.option.size='+encodeURI(sizeFilters[j]), '');
        newUrl = newUrl.replace('filter.v.option.size='+sizeFilters[j].replaceAll(' ', '+'), '');
        newUrl = newUrl.replace('filter.v.option.size='+encodeURI(sizeFilters[j].replaceAll(' ', '+')), '');
        newUrl = newUrl.replace('filter.v.option.size='+escape(sizeFilters[j]), '');
        newUrl = newUrl.replace('filter.v.option.size='+escape(sizeFilters[j].replaceAll(' ', '+')), '');
      }
      html += `
        <facet-remove class="grid pr-3 max-w-max mb-3 grid-cols-1 grid-rows-1 custom-size-active-filter">
          <div class="block bg-body opacity-10 col-start-1 col-end-2 row-start-1 row-end-2"></div>
          <a href="${newUrl}" class="block pl-[12px] pr-2 py-1 col-start-1 col-end-2 row-start-1 row-end-2 z-50 relative after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:pointer-events-none after:border after:opacity-0 after:transition-opacity after:duration-300 hover:after:opacity-100" data-armada-selector="active-facets-button" data-aid="active-filter-${customActiveSizeFilterElement.value}">
            <span class="flex justify-between items-center">
              <span>${customActiveSizeFilterElement.value}</span>
              <svg data-aid="icon-cancel" width="8" height="8" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-hover-classes ml-2">
                <rect width="20.6878" height="1.5" transform="matrix(0.70711 -0.707104 0.70711 0.707104 0.155396 14.7839)" fill="currentColor"></rect>
                <rect width="20.6878" height="1.5" transform="matrix(-0.70711 -0.707104 0.70711 -0.707104 14.7839 15.8445)" fill="currentColor"></rect>
              </svg>
              <span class="sr-only">Clear</span>
            </span>
          </a>
        </facet-remove>
      `;
    });
    if (document.querySelector('[data-armada-selector="filter-main-form"] .active-facets [data-armada-selector="active_facet_container"] [data-armada-selector="filters_clear_all"]')) {
      document.querySelector('[data-armada-selector="filter-main-form"] .active-facets [data-armada-selector="active_facet_container"] [data-armada-selector="filters_clear_all"]').insertAdjacentHTML('beforebegin', html);
    }
  }

  const originalActiveFacetElements = document.querySelectorAll('[data-armada-selector="filter-main-form"] .active-facets facet-remove:not(.custom-size-active-filter)');
  if (originalActiveFacetElements) {
    for (let j=0; j<originalActiveFacetElements.length; j++) {
      
      const orignalFilter = originalActiveFacetElements[j].querySelector('a span span:first-child'); 
      const originalHiddenSizeFilterInputs = document.querySelectorAll('[data-armada-selector="filter-main-form"] [data-aid="filter-category-size"] [data-armada-selector="filter_input_list"] .hidden input');
      if (originalHiddenSizeFilterInputs && orignalFilter) {
        for ( let i=0; i<originalHiddenSizeFilterInputs.length; i++) {
          if (orignalFilter.innerHTML == originalHiddenSizeFilterInputs[i].value) {
            originalActiveFacetElements[j].classList.add('hidden');
            break;
          }
        }
      }
    }
  }
}

window.addEventListener('load', (event) => {
  addCustomColorFilters();
  hideOriginalColorFilters();
  updateActiveFacetCount();
  updateActiveFacets();

  addCustomSizeFilters();
  hideOriginalSizeFilters();
  updateSizeActiveFacetCount();
  updateSizeActiveFacets();

  // Object.entries(colorFilters).forEach(colorFilter => {
  //   const [colorFilterKey, colorFilterValues] = colorFilter;
    
  //   colorFilterValues.forEach(filterValue => {
  //     document.querySelector('[data-aid="filter-category-color"]')
  //   });
  // });

  // const customColorFilters = document.querySelectorAll('.custom-color-filter input');
  // for (let i = 0; i < customColorFilters.length; i++) {
  //   customColorFilters[i].addEventListener('change', function(e) {
  //     const customColorFilter = e.target;
  //     const colorFilters = customColorFilter.getAttribute('data-filters-for').split(",");
  //     for (let j = 0; j < colorFilters.length; j++) {
  //       const colorFilterElement = document.querySelector('[data-aid="filter-category-color"] input[value="'+colorFilters[j]+'"]');
  //       colorFilterElement.previousElementSibling.click();
  //     }
  //   });
  // }

});