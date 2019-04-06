package com.ipn.escom.distribuidos;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

public class Client {

	public static void main(String... args) throws IOException {
		// send request
		DatagramSocket socket = new DatagramSocket();

		byte[] buf = new byte[256];
		String string = "hola 2";
		buf = string.getBytes();
		InetAddress address = InetAddress.getByName("localhost");
		DatagramPacket packet = new DatagramPacket(buf, buf.length, address, 4445);
		socket.send(packet);
		socket.close();
	}

}
