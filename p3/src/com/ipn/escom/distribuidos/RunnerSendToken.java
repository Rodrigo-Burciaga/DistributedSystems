package com.ipn.escom.distribuidos;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;
import java.net.UnknownHostException;

public class RunnerSendToken implements Runnable {

	private Token token;
	private String host;
	private Integer portTo;
	private Boolean isInitial;

	public RunnerSendToken(Token token, String host, Integer portTo, Boolean isInitial) {
		this.token = token;
		this.host = host;
		this.portTo = portTo;
		this.isInitial = isInitial;
	}

	@Override
	public void run() {
		if (!this.isInitial) {
			synchronized (token) {
				try {
					token.wait();
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
		} else {
			this.token.setToken(Token.generateToken());
		}
		while (true) {
			Boolean isSent = false;
			while (!isSent) {
				try (DatagramSocket socket = new DatagramSocket()) {
					byte[] buf = new byte[256];
					System.out.printf("\nAdquiriendo el token %s por 5 segundos\n", this.token.getToken());
					Thread.sleep(5000);
					System.out.println("Token Liberado");
					InetAddress address = InetAddress.getByName(this.host);
					buf = this.token.getToken().getBytes();
					DatagramPacket packet = new DatagramPacket(buf, buf.length, address, this.portTo);
					socket.send(packet);
					// get response
					byte[] buf1 = new byte[256];
					packet = new DatagramPacket(buf1, buf1.length);
					socket.setSoTimeout(3000);
					System.out.println("Esperando mensaje de confirmación");
					socket.receive(packet);
					System.out.println("El mensaje de confirmación es:");
					String received = new String(packet.getData(), 0, packet.getLength());
					System.out.println(received);
					synchronized (this.token) {
						this.token.notify();
						this.token.wait();
					}
				} catch (SocketException | UnknownHostException | InterruptedException e) {
					e.printStackTrace();
				} catch (IOException e) {
					System.out.println("---------------------> No se ha recibido el mensaje de confirmación");
				}
			}
			try {
				token.wait();
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

	}

}
