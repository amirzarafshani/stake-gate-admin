import { useState } from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import useConstant from 'use-constant';
import to from 'await-to-js';

const useDebouncedSearch = (searchFunction) => {
  const [inputText, setInputText] = useState('');

  const debouncedSearchFunction = useConstant(() =>
    AwesomeDebouncePromise(searchFunction, 300),
  );

  const loaadSearchResults = async () => {
    if (inputText.length === 0) {
      return [];
    } else {
      let [err, debouncedResults] = await to(
        debouncedSearchFunction(inputText),
      );
      if (err) return [];

      // console.log('debouncedResults: ', debouncedResults);

      // reformat tags to match AsyncSelect config
      const refactorItems = (items) => {
        return items.map((item) => ({
          label: `${item.full_name} (${item.username})`,
          value: item.id,
        }));
      };

      return debouncedResults.length !== 0
        ? refactorItems(debouncedResults)
        : [];
    }
  };

  return {
    inputText,
    setInputText,
    loaadSearchResults,
  };
};

export default useDebouncedSearch;
