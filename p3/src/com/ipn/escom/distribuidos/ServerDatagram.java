package com.ipn.escom.distribuidos;

import java.io.IOException;
import java.net.DatagramSocket;

public class ServerDatagram extends Thread {

	protected DatagramSocket socket = null;
	private Integer port;
	private Boolean initialServer;
	private Integer portTo;

	public ServerDatagram(String name, Integer port, Boolean initialServer, Integer portTo) {
		super(name);
		this.port = port;
		this.initialServer = initialServer;
		this.portTo = portTo;
	}

	public void run() {
		try (DatagramSocket socket = new DatagramSocket(port)) {
			Token token = new Token();
			RunnerSendToken runnerSendToken = new RunnerSendToken(token, "localhost", this.portTo, this.initialServer);
			new Thread(runnerSendToken).start();
			RunnerReceiveToken runnerReceiveToken = new RunnerReceiveToken(token, this.port);
			new Thread(runnerReceiveToken).start();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
