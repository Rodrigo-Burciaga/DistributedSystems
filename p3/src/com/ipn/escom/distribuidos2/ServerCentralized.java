package com.ipn.escom.distribuidos2;

import java.net.*;
import java.util.LinkedList;
import java.util.Queue;
import java.util.concurrent.Semaphore;
import java.io.*;

public class ServerCentralized extends Thread {

	private Integer port;
	private Queue<Runnable> queue;
	private Semaphore semaphore;
	public static Boolean isAcquired = false;

	public ServerCentralized(Integer port, String name) {
		super(name);
		this.port = port;
		this.queue = new LinkedList<>();
		this.semaphore = new Semaphore(1, true);
	}

	@Override
	public void run() {
		Boolean serverRunning = true;
		try (ServerSocket serverSocket = new ServerSocket(this.port)) {
			Socket clientSocket;
			System.out.println("Server centralized is running on port " + this.port);
			while (serverRunning) {
				clientSocket = serverSocket.accept();
				BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
				String name = in.readLine();
				System.out.println("Accepted new request for " + name);
				Runnable serverCentralized = new RunnableServerCentralized(clientSocket, this.queue, this.semaphore);
				if (!ServerCentralized.isAcquired()) {
					ServerCentralized.runTask(serverCentralized);
				} else {
					this.queue.add(serverCentralized);
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	public static synchronized void acquire() {
		ServerCentralized.isAcquired = true;
	}

	public static synchronized void release() {
		ServerCentralized.isAcquired = false;
	}

	public static synchronized Boolean isAcquired() {
		return ServerCentralized.isAcquired;
	}

	public static synchronized Boolean isEmptyQueue(Queue<Runnable> queue) {
		return queue.isEmpty();
	}

	public static synchronized void runTask(Runnable runner) {
		new Thread(runner).start();
	}
}