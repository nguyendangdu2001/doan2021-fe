import socket from "@config/socketio";
import { useAppSelector } from "@hooks/reduxHook";
import useQueryString from "@hooks/useQueryString";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import Peer from "simple-peer";
const CallVideo = () => {
  const userVideo = useRef();
  const partnerVideo = useRef();
  const peerRef = useRef();

  const otherUser = useRef();
  const userStream = useRef();
  const { idRoom } = useParams();
  const query = useQueryString();
  const from = query.get("from");
  const to = query.get("to");
  const isCall = !!query.get("call");

  const [isAcceptCalled, setAcceptCalled] = useState(false);
  useEffect(() => {
    if (isCall) {
      socket.on("waiting-accept-call", (data) => {
        setAcceptCalled((old) => true);
      });
    } else {
      socket.emit("accept-call", { to: from });
    }
  }, [isCall, from]);
  const createPeer = useCallback((userID) => {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.stunprotocol.org",
        },
        {
          urls: "turn:numb.viagenie.ca",
          credential: "muazkh",
          username: "webrtc@live.com",
        },
      ],
    });

    peer.onicecandidate = handleICECandidateEvent;
    peer.ontrack = handleTrackEvent;
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);

    return peer;
  }, []);
  const handleRecieveCall = useCallback(
    (incoming) => {
      peerRef.current = createPeer();
      const desc = new RTCSessionDescription(incoming.sdp);
      peerRef.current
        .setRemoteDescription(desc)
        .then(() => {
          userStream.current
            .getTracks()
            .forEach((track) =>
              peerRef.current.addTrack(track, userStream.current)
            );
        })
        .then(() => {
          return peerRef.current.createAnswer();
        })
        .then((answer) => {
          return peerRef.current.setLocalDescription(answer);
        })
        .then(() => {
          const payload = {
            target: incoming.caller,
            caller: socket.id,
            sdp: peerRef.current.localDescription,
          };
          socket.emit("answer", payload);
        });
    },
    [createPeer]
  );
  const callUser = useCallback(
    (userID) => {
      peerRef.current = createPeer(userID);
      userStream.current
        .getTracks()
        .forEach((track) =>
          peerRef.current.addTrack(track, userStream.current)
        );
    },
    [createPeer]
  );

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        userStream.current = stream;
        if (!isCall) {
          callUser(to);
        }
        otherUser.current = to;

        socket.on("offer", handleRecieveCall);

        socket.on("answer", handleAnswer);

        socket.on("ice-candidate", handleNewICECandidateMsg);
        return () => {
          socket.off("offer");
          socket.off("answer");
          socket.off("ice-candidate");
        };
      });
  }, [callUser, handleRecieveCall, idRoom, to, isCall, isAcceptCalled]);

  function handleNegotiationNeededEvent(userID) {
    peerRef.current
      .createOffer()
      .then((offer) => {
        return peerRef.current.setLocalDescription(offer);
      })
      .then(() => {
        const payload = {
          target: userID,
          caller: socket.id,
          sdp: peerRef.current.localDescription,
        };
        socket.emit("offer", payload);
      })
      .catch((e) => console.log(e));
  }

  function handleAnswer(message) {
    const desc = new RTCSessionDescription(message.sdp);
    peerRef.current.setRemoteDescription(desc).catch((e) => console.log(e));
  }

  function handleICECandidateEvent(e) {
    if (e.candidate) {
      const payload = {
        target: otherUser.current,
        candidate: e.candidate,
      };
      socket.emit("ice-candidate", payload);
    }
  }

  function handleNewICECandidateMsg(incoming) {
    const candidate = new RTCIceCandidate(incoming);

    peerRef.current.addIceCandidate(candidate).catch((e) => console.log(e));
  }

  function handleTrackEvent(e) {
    partnerVideo.current.srcObject = e.streams[0];
  }

  return (
    <div className="grid grid-cols-2">
      <div>
        <h1>Tôi</h1>
        <video muted autoPlay ref={userVideo} />
      </div>
      <div>
        {otherUser.current}
        <video muted autoPlay ref={partnerVideo} />
      </div>
    </div>
  );
};

export default CallVideo;
