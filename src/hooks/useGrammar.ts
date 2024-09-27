//Hook para manejar el estado y operaciones relacionadas con la gramática (crear, derivar, verificar tipo, etc.).

import { useEffect, useState } from "react";

const useGrammar = () => {
  const [loader, setLoader] = useState<boolean>(false);

  const callbackSettings = (data: SettingsForm) => {
    console.log(data, loader, "callbackSettings");
    setLoader(true);
  };

  useEffect(() => {
    if (loader) {
      setTimeout(() => {
        setLoader(false);
      }, 1000);
    }
  }, [loader]);

  return {
    loader,
    setLoader,
    callbackSettings,
  };
};

export default useGrammar;
