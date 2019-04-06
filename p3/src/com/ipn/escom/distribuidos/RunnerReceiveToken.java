package com.ipn.escom.distribuidos;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

public class RunnerReceiveToken implements Runnable {

	private Token token;
	private Integer port;

	public RunnerReceiveToken(Token token, Integer port) {
		this.token = token;
		this.port = port;
	}

	@Override
	public void run() {
		try (DatagramSocket socket = new DatagramSocket(this.port)) {
			while (true) {
				byte[] buf = new byte[256];
				DatagramPacket packet = new DatagramPacket(buf, buf.length);
				try {
					System.out.println("Esperando el Token");
					socket.receive(packet);
					String token = new String(packet.getData(), 0, packet.getLength());
					System.out.printf("Se ha recibido el token %s\n", token);
					this.token.setToken(token);
					// sending back confirmation
					InetAddress address = packet.getAddress();
	                int port = packet.getPort();
	                buf = "Recibido colega".getBytes();
	                packet = new DatagramPacket(buf, buf.length, address, port);
	                socket.send(packet);
					synchronized (this.token) {
						this.token.notify();
						this.token.wait();
					}
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
