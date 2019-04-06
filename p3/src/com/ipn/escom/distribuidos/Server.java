package com.ipn.escom.distribuidos;

import java.util.Scanner;

public class Server {

	public static void main(String... args) {
		Scanner in = new Scanner(System.in);
		Boolean nan = true;
		String name = null;
		Integer port = null;
		String isInitial = null;
		Integer portTo = null;
		while (nan) {
			try {
				System.out.println("Enter name of server:");
				name = in.nextLine();
				System.out.println("Enter port of server:");
				port = in.nextInt();
				in.nextLine();
				System.out.println("Is the initial server?: y = yes, another key otherwise");
				isInitial = in.nextLine();
				System.out.println("Port To connect");
				portTo = in.nextInt();
				in.nextLine();
				nan = false;
			} catch (Exception e) {
				in.nextLine();
				System.out.println("Invalid character");
			}
		}
		in.close();
		Boolean initialServer = isInitial.equalsIgnoreCase("y");
		ServerDatagram server = new ServerDatagram(name, port, initialServer, portTo);
		server.start();

	}
}
