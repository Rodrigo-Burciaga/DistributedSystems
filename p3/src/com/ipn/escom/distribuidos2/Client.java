package com.ipn.escom.distribuidos2;

import java.io.*;
import java.net.*;
import java.util.Scanner;

public class Client {

	public static void main(String... args) throws IOException {

		Scanner scan = new Scanner(System.in);
		Boolean nan = true;
		String name = null;
		Integer port = null;
		while (nan) {
			try {
				System.out.println("Enter name of client:");
				name = scan.nextLine();
				System.out.println("Enter port of server:");
				port = scan.nextInt();
				nan = false;
			} catch (Exception e) {
				scan.nextLine();
				System.out.println("Invalid character");
			}
		}
		scan.close();
		System.out.println("Client: " + name);

		try (Socket serverSocket = new Socket("localhost", port);
				PrintWriter out = new PrintWriter(serverSocket.getOutputStream(), true);
				BufferedReader in = new BufferedReader(new InputStreamReader(serverSocket.getInputStream()));
				BufferedReader stdIn = new BufferedReader(new InputStreamReader(System.in))) {
			String recv = in.readLine();
			System.out.println(recv);
			recv = in.readLine();
			System.out.println(recv);
		} catch (UnknownHostException e) {
			System.err.println("Don't know about host localhost");
			System.exit(1);
		} catch (IOException e) {
			System.err.println("Couldn't get I/O for the connection to localhost");
			System.exit(1);
		}
	}
}