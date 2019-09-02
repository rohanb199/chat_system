-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 02, 2019 at 03:27 PM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chat_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `attachment`
--

CREATE TABLE `attachment` (
  `id` char(15) NOT NULL,
  `fileName` varchar(30) NOT NULL,
  `fileType` varchar(4) NOT NULL,
  `uploadedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `path` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Triggers `attachment`
--
DELIMITER $$
CREATE TRIGGER `attachment_id` BEFORE INSERT ON `attachment` FOR EACH ROW BEGIN
  INSERT INTO attachment_seq VALUES (NULL);
  SET NEW.id = CONCAT('ATTC', LPAD(LAST_INSERT_ID(), 11, '0'));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `attachment_seq`
--

CREATE TABLE `attachment_seq` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `conversation`
--

CREATE TABLE `conversation` (
  `id` char(15) NOT NULL,
  `conversationType` char(10) NOT NULL,
  `createdBy` char(15) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `conversationName` varchar(35) NOT NULL,
  `participants` varchar(196) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `conversation`
--

INSERT INTO `conversation` (`id`, `conversationType`, `createdBy`, `createdAt`, `conversationName`, `participants`) VALUES
('CONV00000000006', 'CONV_GROUP', 'USER00000000021', '2019-08-31 05:07:19', 'Group 1', '[{\"fullName\":\"John Doe\",\"id\":\"USER00000000002\"},{\"fullName\":\"Lorem Ipsum\",\"id\":\"USER00000000003\"},{\"fullName\":\"Megane Fox\",\"id\":\"USER00000000021\"}]'),
('CONV00000000008', 'CONV_GROUP', 'USER00000000021', '2019-08-31 05:08:10', 'Group 2', '[{\"fullName\":\"John Doe\",\"id\":\"USER00000000002\"},{\"fullName\":\"Lorem Ipsum\",\"id\":\"USER00000000003\"},{\"fullName\":\"Megane Fox\",\"id\":\"USER00000000021\"}]'),
('CONV00000000009', 'CONV_CHNNL', 'USER00000000021', '2019-08-31 07:16:03', 'Chat system dashboard', '[{\"fullName\":\"John Doe\",\"id\":\"USER00000000002\"},{\"fullName\":\"Lorem Ipsum\",\"id\":\"USER00000000003\"},{\"fullName\":\"Megane Fox\",\"id\":\"USER00000000021\"}]'),
('CONV00000000010', 'CONV_CHNNL', 'USER00000000002', '2019-08-31 12:49:29', 'Channel Preview', '[{\"fullName\":\"Lorem Ipsum\",\"id\":\"USER00000000003\"},{\"fullName\":\"John Doe\",\"id\":\"USER00000000002\"}]');

--
-- Triggers `conversation`
--
DELIMITER $$
CREATE TRIGGER `conversation_id` BEFORE INSERT ON `conversation` FOR EACH ROW BEGIN
  INSERT INTO conversation_seq VALUES (NULL);
  SET NEW.id = CONCAT('CONV', LPAD(LAST_INSERT_ID(), 11, '0'));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `conversation_seq`
--

CREATE TABLE `conversation_seq` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `conversation_seq`
--

INSERT INTO `conversation_seq` (`id`) VALUES
(6),
(8),
(9),
(10),
(11),
(12);

-- --------------------------------------------------------

--
-- Table structure for table `conversation_types`
--

CREATE TABLE `conversation_types` (
  `id` char(10) NOT NULL,
  `someLabel` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `conversation_types`
--

INSERT INTO `conversation_types` (`id`, `someLabel`) VALUES
('CONV_CHNNL', 'Channels'),
('CONV_DRECT', 'Directs'),
('CONV_GROUP', 'Groups');

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` char(15) NOT NULL,
  `senderId` char(15) NOT NULL,
  `conversationType` char(10) NOT NULL,
  `conversationId` char(15) NOT NULL,
  `message` varchar(1000) NOT NULL,
  `readFlag` tinyint(1) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `attachments` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Triggers `message`
--
DELIMITER $$
CREATE TRIGGER `message_id` BEFORE INSERT ON `message` FOR EACH ROW BEGIN
  INSERT INTO message_seq VALUES (NULL);
  SET NEW.id = CONCAT('MSSG', LPAD(LAST_INSERT_ID(), 11, '0'));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `message_seq`
--

CREATE TABLE `message_seq` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` char(15) NOT NULL,
  `firstName` varchar(15) NOT NULL,
  `lastName` varchar(15) NOT NULL,
  `username` varchar(25) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(30) NOT NULL,
  `avatarSrc` varchar(100) NOT NULL,
  `birthdate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `qualification` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `firstName`, `lastName`, `username`, `email`, `password`, `avatarSrc`, `birthdate`, `qualification`) VALUES
('USER00000000002', 'John', 'Doe', 'j.doe', 'j.doe@gmail.com', 'John@123', '', '2019-08-31 04:53:35', 'Frontend Developer Angular 2+'),
('USER00000000003', 'Lorem', 'Ipsum', 'ipsum.lorem', 'ipsum.lorem@gmail.com', 'Lorem@123', '', '2019-08-31 04:54:27', 'Odontoiatra'),
('USER00000000021', 'Megane', 'Fox', 'megane.fox', 'megane.fox@gmail.com', 'Megane@123', '', '2019-08-31 06:58:21', ''),
('USER00000000023', 'Kendall', 'Jenner', 'kendall', 'kendall.jenner@gmail.com', 'Kendall@123', '', '2000-09-14 22:00:00', ''),
('USER00000000024', 'Bill', 'Gates', 'bill.gates', 'bill.gates@gmail.com', 'Bill@123', '', '1988-09-28 22:00:00', ''),
('USER00000000025', 'Steve', 'Jobs', 'apple', 'jobs@apple.com', 'IphoneXS', '', '1979-09-29 22:00:00', '');

--
-- Triggers `user`
--
DELIMITER $$
CREATE TRIGGER `user_id` BEFORE INSERT ON `user` FOR EACH ROW BEGIN
  INSERT INTO user_seq VALUES (NULL);
  SET NEW.id = CONCAT('USER', LPAD(LAST_INSERT_ID(), 11, '0'));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `user_seq`
--

CREATE TABLE `user_seq` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_seq`
--

INSERT INTO `user_seq` (`id`) VALUES
(1),
(2),
(3),
(4),
(5),
(7),
(8),
(10),
(11),
(12),
(13),
(15),
(17),
(19),
(21),
(23),
(24),
(25);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attachment`
--
ALTER TABLE `attachment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `attachment_seq`
--
ALTER TABLE `attachment_seq`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `conversation`
--
ALTER TABLE `conversation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `conversation_seq`
--
ALTER TABLE `conversation_seq`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `conversation_types`
--
ALTER TABLE `conversation_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `message_seq`
--
ALTER TABLE `message_seq`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `user_seq`
--
ALTER TABLE `user_seq`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attachment_seq`
--
ALTER TABLE `attachment_seq`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `conversation_seq`
--
ALTER TABLE `conversation_seq`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `message_seq`
--
ALTER TABLE `message_seq`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_seq`
--
ALTER TABLE `user_seq`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
