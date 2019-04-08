package com.ipn.escom.distribuidos2;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.Queue;
import java.util.concurrent.Semaphore;

public class RunnableServerCentralized implements Runnable {

	private Socket clientSocket;
	private Queue<Runnable> queue;
	private Semaphore semaphore;

	public RunnableServerCentralized(Socket clientSocket, Queue<Runnable> queue, Semaphore semaphore) {
		this.clientSocket = clientSocket;
		this.queue = queue;
		this.semaphore = semaphore;
	}

	@Override
	public void run() {
		try (PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true);
				BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));) {
			this.semaphore.acquire();
			ServerCentralized.acquire();
			out.println("You are currently running in critic section");
			Thread.sleep(5000);
			this.semaphore.release();
			ServerCentralized.release();
			System.out.println("Critic Section Liberated");
			if (!ServerCentralized.isEmptyQueue(this.queue)) {
				ServerCentralized.runTask(this.queue.remove());
			}
			out.println("You are done");
			this.clientSocket.close();
		} catch (IOException | InterruptedException e) {
			e.printStackTrace();
		}
	}

}
