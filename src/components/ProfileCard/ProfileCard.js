import React, { Component } from "react";
import { Card, Avatar } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";

const { Meta } = Card;
export default class ProfileCard extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   render() {
      console.log(this.props.userData);
      return (
         <Card
            style={{ width: "100%" }}
            cover={
               <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
               />
            }
            actions={[<EditOutlined key="edit" />]}>
            <Meta title={"Username:  " + this.props.userData.username} />
            <Meta title={"BirthDate:  " + this.props.userData.birth_date} />
            <Meta title={"Email:  " + this.props.userData.email} />
         </Card>
      );
   }
}
