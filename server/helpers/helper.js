const helper = (req) => {
  if (req.url === '/red-flags') {
    console.log('red-flag');
  } else {
    console.log('intervention');
  }
};

export default helper;
