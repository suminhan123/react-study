import MeetupDetail from "@/components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.tile}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>

      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://new_user:OHK7FSToajKnweHe@cluster0.t8st3rc.mongodb.net/test"
  ); // meetup
  const db = client.db();
  const meetupCollection = db.collection("meetups");

  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray(); // 모든 meetup data 중 특정 필드 id만 접근 다른 필드는 접근 노노
  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch the
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://new_user:OHK7FSToajKnweHe@cluster0.t8st3rc.mongodb.net/test"
  ); // meetup
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const selectedMeetup = await meetupCollection.findOne({
    _id: ObjectId(meetupId),
  }); // 하나의 문서를 찾는다 어떻게 문서를 검색하는지 정의하는 객체를 전달해야함
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}
export default MeetupDetails;
