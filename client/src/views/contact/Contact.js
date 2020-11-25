import { useEffect } from 'react';

import useTopLoader from '../../hooks/useTopLoader';

const Contact = () => {
  const [loading, onToggleTopLoader] = useTopLoader();

  useEffect(() => {
    onToggleTopLoader(false);
  }, []);

  return (
    <div>
      <p>தொடர்புக்கு :</p>
      <p>வணக்கம் ! இன்பத் தமிழ் நம் உயிருக்கு நேர் !</p>

      <p>
        இராவணன் அங்காடியைத் தொடர்பு கொள்ள கீழ்காணும் இணைப்புகளைப்
        பயன்படுத்தவும்.
      </p>

      <p>வாடிக்கையாளர் பிரிவு தொடர்புக்கு :</p>
      <address>
        தொலைபேசி/பகிரி : 7871003935 <br />
        மின்னஞ்சல் : raavananstore@gmail.com
      </address>
      <p>
        மற்றபடி எந்த ஒரு சமூக வலைத்தலங்களிலும் இராவணன் அங்காடியின் பக்கங்களில்
        குறுஞ்செய்தி அனுப்பியும் தொடர்பு கொள்ளலாம்.{' '}
      </p>
    </div>
  );
};

export default Contact;
