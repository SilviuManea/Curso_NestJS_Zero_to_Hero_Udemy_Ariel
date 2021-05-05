// Feature

class FriendsList {
  friends = [];

  addFriend(name) {
    this.friends.push(name);
    this.announceFriendship(name);
  }

  announceFriendship(name) {
    console.log(`${name} is now a friend!`);
  }

  removeFriend(name) {
    const idx = this.friends.indexOf(name);

    if (idx === -1) {
      throw new Error('Friend not found!');
    }

    this.friends.splice(idx, 1);
  }
}

// Tests
describe('FriendsLists', () => {
  let friendsList;
  beforeEach(() => {
    friendsList = new FriendsList();
  });

  it('initializes friends list', () => {
    //Ensure that the friends list initializes properly
    expect(friendsList.friends.length).toEqual(0);
  });

  it('adds a friend to the list', () => {
    friendsList.addFriend('Silviu');
    //Since a new friend is added expect the array to have length 1
    expect(friendsList.friends.length).toEqual(1);
  });

  it('announces friendship', () => {
    friendsList.announceFriendship = jest.fn(); //spies this function and if it has been called

    expect(friendsList.announceFriendship).not.toHaveBeenCalled(); //it should not be called here
    friendsList.addFriend('Silviu'); //function is called here
    expect(friendsList.announceFriendship).toHaveBeenCalledWith('Silviu'); //it checks if the function has been called
  });

  describe('removeFriend', () => {
    it('removes a friend from the list', () => {
      friendsList.addFriend('Silviu');
      expect(friendsList.friends[0]).toEqual('Silviu'); //expect the friends to be Silviu
      friendsList.removeFriend('Silviu');
      expect(friendsList.friends[0]).toBeUndefined(); //expect to be undefined
    });

    it('throws an error if friend does not exist', () => {
      expect(() => friendsList.removeFriend('Silviu')).toThrow(); //we expect that anonimous function to throw an error, which does
    });
  });
});

// Example
// describe('my test', () => {
//   it('returns true', () => {
//     expect(true).toEqual(true); //
//   });
// });
