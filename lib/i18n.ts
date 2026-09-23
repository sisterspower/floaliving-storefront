export type Locale='en'|'nl'|'tr';
export const locales:Locale[]=['en','nl','tr'];

export const dict={
 en:{
  shop:'SHOP',robes:'ROBES',towels:'TOWELS',world:'OUR WORLD',
  search:'SEARCH',account:'ACCOUNT',bag:'BAG',
  newCollection:'NEW COLLECTION',discover:'Discover',discoverWorld:'Discover our world',shopNow:'Shop now',
  slower:'SLOWER MORNINGS.',
  made:'MADE TO LIVE IN',
  madeCopy:'100% cotton. Soft terry inside. Velour finish outside. Finished with our signature wave trim.',
  stories:'FLOA STORIES',
  stay:'STAY CLOSE.',
  stayCopy:'New collections, colours and stories.',
  emailPlaceholder:'Enter your email',
  subscribe:'Subscribe',
  subscribed:'You have been subscribed.',
  newsletterNote:'By clicking "subscribe", you agree to receive updates from FLOALIVING. You can unsubscribe at any time.',
  getInTouch:'Get in touch',
  add:'ADD TO BAG',colour:'Colour',size:'Size',
  inStock:'In stock',lowStock:'Low stock',soldOut:'Sold out',
  details:'Details',fit:'Size & Fit',care:'Material & Care',delivery:'Delivery & Returns',
  accountHeading:'Enter your email to sign in to your account or create a new one',
  emailLabel:'Email*',
  continueBtn:'Continue',
  orContinueWith:'You can also continue with',
  socialConsent:'By signing in with a social account, you agree to link your account in line with our',
  privacyPolicy:'Privacy Policy',
  continueWithFacebook:'Continue with Facebook',
  continueWithApple:'Continue with Apple',
  continueWithGoogle:'Continue with Google',
  guestOrdersPre:'View the orders you placed as a guest and manage your returns',
  hereWord:'here',
  guestOrdersPost:'.',
  signedInAs:'Signed in as',
  signOut:'Sign out',
  authError:'Something went wrong while signing in. Please try again.',
 },
 nl:{
  shop:'SHOP',robes:'BADJASSEN',towels:'HANDDOEKEN',world:'ONS VERHAAL',
  search:'ZOEKEN',account:'ACCOUNT',bag:'TAS',
  newCollection:'NIEUWE COLLECTIE',discover:'Ontdek',discoverWorld:'Ontdek onze wereld',shopNow:'Shop nu',
  slower:'LANGZAME OCHTENDEN.',
  made:'GEMAAKT OM IN TE LEVEN',
  madeCopy:'100% katoen. Zachte badstof aan de binnenkant. Velours afwerking aan de buitenkant. Afgewerkt met onze kenmerkende golvende bies.',
  stories:'FLOA VERHALEN',
  stay:'BLIJF DICHTBIJ.',
  stayCopy:'Nieuwe collecties, kleuren en verhalen.',
  emailPlaceholder:'Vul je e-mailadres in',
  subscribe:'Abonneren',
  subscribed:'Je bent aangemeld.',
  newsletterNote:'Door op "abonneren" te klikken, ga je akkoord met het ontvangen van updates van FLOALIVING. Je kunt je op elk moment afmelden.',
  getInTouch:'Neem contact op',
  add:'TOEVOEGEN AAN TAS',colour:'Kleur',size:'Maat',
  inStock:'Op voorraad',lowStock:'Lage voorraad',soldOut:'Uitverkocht',
  details:'Details',fit:'Maat & Pasvorm',care:'Materiaal & Onderhoud',delivery:'Levering & Retouren',
  accountHeading:'Vul je e-mailadres in om in te loggen op je account of een nieuw account aan te maken',
  emailLabel:'E-mail*',
  continueBtn:'Doorgaan',
  orContinueWith:'Je kunt ook doorgaan met',
  socialConsent:'Door in te loggen met een social account ga je akkoord met het koppelen van je account conform ons',
  privacyPolicy:'Privacybeleid',
  continueWithFacebook:'Doorgaan met Facebook',
  continueWithApple:'Doorgaan met Apple',
  continueWithGoogle:'Doorgaan met Google',
  guestOrdersPre:'Bekijk de bestellingen die je als gast hebt geplaatst en beheer je retouren',
  hereWord:'hier',
  guestOrdersPost:'.',
  signedInAs:'Ingelogd als',
  signOut:'Uitloggen',
  authError:'Er ging iets mis bij het inloggen. Probeer het opnieuw.',
 },
 tr:{
  shop:'MAĞAZA',robes:'BORNOZLAR',towels:'HAVLULAR',world:'DÜNYAMIZ',
  search:'ARA',account:'HESAP',bag:'SEPETIM',
  newCollection:'YENİ KOLEKSİYON',discover:'Keşfet',discoverWorld:'Dünyamızı keşfet',shopNow:'Şimdi alışveriş yap',
  slower:'YAVAŞ SABAHLAR.',
  made:'YAŞAMAK İÇİN TASARLANDI',
  madeCopy:'%100 pamuk. İçi yumuşak havlu kumaş. Dışı kadife görünümlü finish. İmza dalga şeridimizle tamamlandı.',
  stories:'FLOA HİKAYELERİ',
  stay:'YAKIN KAL.',
  stayCopy:'Yeni koleksiyonlar, renkler ve hikayeler.',
  emailPlaceholder:'E-posta adresinizi girin',
  subscribe:'Abone Ol',
  subscribed:'Abone oldunuz.',
  newsletterNote:'"Abone Ol" butonuna tıklayarak FLOALIVING\'den güncellemeler almayı kabul ettiniz. Dilediğiniz zaman abonelikten çıkabilirsiniz.',
  getInTouch:'Bize Ulaşın',
  add:'SEPETE EKLE',colour:'Renk',size:'Beden',
  inStock:'Stokta var',lowStock:'Son adetler',soldOut:'Tükendi',
  details:'Detaylar',fit:'Beden & Kalıp',care:'Materyal & Bakım',delivery:'Teslimat & İade',
  accountHeading:'Hesabınıza giriş yapmak veya yeni bir hesap oluşturmak için e-postanızı girin',
  emailLabel:'E-posta*',
  continueBtn:'Devam Et',
  orContinueWith:'Şununla da erişebilirsiniz',
  socialConsent:'Sosyal medya giriş bilgilerimle giriş yaparak, hesabımı aşağıdaki koşullara uygun olarak bağlamayı kabul ediyorum',
  privacyPolicy:'Gizlilik Politikası',
  continueWithFacebook:'Facebook ile devam et',
  continueWithApple:'Apple ile devam et',
  continueWithGoogle:'Google ile devam et',
  guestOrdersPre:'Misafir olarak verdiğiniz siparişleri ve yaptığınız iadeleri',
  hereWord:'buradan',
  guestOrdersPost:' görüntüleyin.',
  signedInAs:'Giriş yapıldı:',
  signOut:'Çıkış yap',
  authError:'Giriş yapılırken bir sorun oluştu. Lütfen tekrar deneyin.',
 },
} as const;

export function localeFrom(v:string):Locale{
 return locales.includes(v as Locale)?(v as Locale):'en';
}

export const routes={
 en:{home:'/en',robes:'/en/robes',towels:'/en/towels',world:'/en/our-world',journal:'/en/journal',account:'/en/account'},
 nl:{home:'/nl',robes:'/nl/badjassen',towels:'/nl/handdoeken',world:'/nl/ons-verhaal',journal:'/nl/journal',account:'/nl/account'},
 tr:{home:'/tr',robes:'/tr/bornozlar',towels:'/tr/havlular',world:'/tr/dunyamiz',journal:'/tr/journal',account:'/tr/hesabim'},
} as const;

type RouteKey=keyof typeof routes['en'];

export function switchLocale(path:string,to:Locale){
 const slug=path.split('/').filter(Boolean).at(-1);
 const isProductPath=locales.some(l=>path.startsWith(routes[l].robes+'/'));
 if(isProductPath&&slug)return `${routes[to].robes}/${slug}`;

 const keys:RouteKey[]=['towels','world','journal','account','robes'];
 for(const key of keys){
  if(locales.some(l=>path.startsWith(routes[l][key])))return routes[to][key];
 }
 return routes[to].home;
}
