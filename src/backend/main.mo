import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import List "mo:core/List";
import Order "mo:core/Order";

actor {
  // Message Type and Comparison
  type Message = {
    name : Text;
    email : Text;
    content : Text;
  };

  module Message {
    public func compare(msg1 : Message, msg2 : Message) : Order.Order {
      Text.compare(msg1.name, msg2.name);
    };
  };

  // Message Storage
  let messages = List.empty<Message>();

  public shared ({ caller }) func submit(name : Text, email : Text, content : Text) : async () {
    if (name.size() == 0 or email.size() == 0 or content.size() == 0) {
      Runtime.trap("All fields are required.");
    };
    let message = { name; email; content };
    messages.add(message);
  };

  public query ({ caller }) func getAllMessages() : async [Message] {
    messages.toArray().sort();
  };
};
