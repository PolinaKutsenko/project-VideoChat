import _ from 'lodash';

export const getNextId = () => Number(_.uniqueId());

const buildState = (defaultState) => {
  const state = {
    messages: [],
    users: [],
  };

  if (defaultState.messages) {
    state.messages.push(...defaultState.messages);
  }
  if (defaultState.users) {
    state.users.push(...defaultState.users);
  }

  return state;
};

export const state = buildState({});
