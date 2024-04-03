import {View, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import TextComponent from './TextComponent';
import RatingComponent from './RatingComponent';
import {getUsers} from '../hooks/getUsers';

interface Props {
  data: Array<any> | undefined;
}

const CommentComponent = (props: Props) => {
  const {data} = props;
  const [users, setUsers] = useState<Array<any>>();

  useEffect(() => {
    const fetchUsersData = async () => {
      const usr = await getUsers();

      setUsers(usr?.usersData);
    };

    fetchUsersData();
  }, []);

  if (!users) {
    return null;
  }

  const userData = {};
  users?.forEach(user => {
    /* @ts-ignore */
    userData[user.id] = {
      id: user.id,
      name: user.name,
      profileImgURL: user.profileImgURL,
    };
  });

  return (
    <View>
      {data?.map(item => (
        <View key={item.id}>
          {/* @ts-ignore */}
          {userData[item.userId] && (
            <View style={styles.userDataContainer}>
              <Image
                /* @ts-ignore */
                source={{uri: userData[item.userId].profileImgURL}}
                style={styles.profileImg}
              />
              <View style={{display: 'flex', flexDirection: 'column'}}>
                <TextComponent
                  /* @ts-ignore */
                  text={userData[item.userId].name}
                  font="bold"
                  size={18}
                />
                <RatingComponent
                  disabled={true}
                  error={null}
                  setRating={null}
                  obtainedValue={item.rating}
                />
              </View>
            </View>
          )}
          <View style={{paddingVertical: 20}}>
            {item.review != '' && <TextComponent text={item.review} />}
          </View>
        </View>
      ))}
    </View>
  );
};

export default CommentComponent;

const styles = StyleSheet.create({
  profileImg: {
    borderRadius: 100,
    width: 55,
    height: 55,
    borderWidth: 3,
    borderColor: 'black',
  },
  userDataContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
