'use strict';

const getAllUsers = async () => {
  const data = await (await fetch('api/users')).json();
  console.log(data);
};
